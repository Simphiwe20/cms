import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApisServicesService } from 'src/app/services/apis-services.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  ExcelData: any;
  displayedColumns: string[] = ['email', 'name', 'surname', 'role', 'action'];
  dataSource: MatTableDataSource<any>;
  disabledDataSource: any[] = [];
  enableDataSource: any[] = []
  users: any;
  employees: any;
  statuses: any = ['active', 'disable']
  disabledUsers: any = [];
  enabledUsers: any = []


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedService: SharedServicesService, private api: ApisServicesService, private routes: Router) {
    this.getUsers()
    this.dataSource = new MatTableDataSource(this.users)
    console.log(this.users)
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers(): void {
    this.api.genericGet('/get-all-users')
      .subscribe({
        next: (res) => {
          this.users = res
          console.log('Inside the next: ', this.users)
          this.showUsers(res)
          this.moveUsers(res)
        },
        error: () => { },
        complete: () => { }
      })
  }

  showUsers(users: any): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users?.filter((user: any) => {
      if (user.email !== 'admin@cms.co.za') {
        return user
      }
    }))
    console.log(this.dataSource)
    this.moveUsers(users)

    console.log('Users:', this.users)
  }

  moveUsers(users: any): void {
    this.disabledUsers = []
    this.enabledUsers = []
    users.forEach((user: any) => {
      if (user.status === 'disable' && user.email !== 'admin@cms.co.za') {
        this.disabledUsers.push(user)
      }
    })
    this.disabledDataSource = this.disabledUsers

    users.forEach((user: any) => {
      if (user.status === 'active' && user.email !== 'admin@cms.co.za') {
        this.enabledUsers.push(user)
      }
    })
    this.enableDataSource = this.enabledUsers
  }

  onFileChange(event: any): void {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    // fileReader.readAsBinaryString(file)
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e: any) => {
      let workBook = XLSX.read(fileReader.result, { type: 'binary' });
      let sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      console.log(this.ExcelData)

      this.sharedService.storeNewUsers(this.ExcelData)
      console.log(this.users)
    };

    setTimeout(() => {
      this.api.genericGet('/get-all-users')
        .subscribe({
          next: (res) => this.showUsers(res),
          error: (err) => { console.log(err) },
          complete: () => { }
        })
    }, 700)

    // fileReader.readAsArrayBuffer(file);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateUserStatus(status: string, user: any): void {
    console.log(status)
    this.users?.forEach((_user: any) => {
      if (user.email === _user.email) {
        _user['status'] = status
        this.api.genericUpdate('/updates-user', _user)
          .subscribe({
            next: (res) => { this.getUsers() },
            error: (err) => { console.log(err) },
            complete: () => { }
          })
      }

    })
  }
}