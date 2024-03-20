import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../popUps/add-user/add-user.component';
import { ApisServicesService } from 'src/app/services/apis-services.service';
import { EditUserComponent } from '../popUps/edit-user/edit-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  convertedJson!: string;
  spreadsheetData: any;
  mynew: any = [];
  displayedColumn: string[] = ['Emp_ID', 'Emp_Name', 'Emp_Surname', 'Emp_DOB', 'Emp_Gender', 'Emp_Email', 'Actions'];
  users: any[] = [];
  rowActivationStates: { [key: string]: boolean } = {};
  editUsers: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();


  constructor(private dialog: MatDialog, private sharedService: ApisServicesService, private snackbar: MatSnackBar,
    private usersService: SharedServicesService, private apiServ: ApisServicesService) {
    this.editUsers = this.usersService.getUser('users', 'local');
  }

  ngOnInit(): void {
    this.users.forEach(row => {
      this.rowActivationStates[row.Emp_ID] = false;
    });

    this.dataSource = new MatTableDataSource(this.users);
  }

  toggleActivation(rowId: string): void {
    this.rowActivationStates[rowId] = !this.rowActivationStates[rowId];
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(userr: any): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: userr
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiServ.genericPut('/updateUser', result)
          .subscribe((updatedUser: any) => {
            const updatedUserIndex = this.users.findIndex(u => u.Emp_ID === updatedUser.Emp_ID);
            if (updatedUserIndex !== -1) {
              this.users[updatedUserIndex] = updatedUser;
              this.dataSource.data = [...this.users];
              this.snackbar.open('User edited successfully', 'Ok', { duration: 2000 });
            }

            this.apiServ.genericGet('/getUser').subscribe((data: any) => {
              const updatedUser = data;
              const updatedUserIndex = this.users.findIndex(u => u.Emp_ID === updatedUser.Emp_ID);
              if (updatedUserIndex !== -1) {
                this.users[updatedUserIndex] = updatedUser;
                this.dataSource.data = [...this.users];
                this.snackbar.open('User edited successfully', 'Ok', { duration: 3000 });
              }
            }, error => {
              this.snackbar.open('Failed to fetch updated user data', 'Ok', { duration: 2000 });
            });
          });
      }
    });
  }

  openFormPopup(): void {
    const _popup = this.dialog.open(AddUserComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Add User'
      }
    });

    _popup.afterClosed().subscribe(item => {
      if (item && item.data) {
        this.users.push(item.data);
        this.dataSource.data = this.users;
      }
    });
  }

  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data);
        this.spreadsheetData = data;
        this.convertedJson = JSON.stringify(data, undefined, 4);
        // ////////////////
        const _users = localStorage.getItem('users');
        const users = _users ? JSON.parse(_users) : [];
        let doesUserExist: boolean;

        if(users){
          this.spreadsheetData.forEach((item: any) => {
            doesUserExist = false;
            console.log(users)
            users.forEach((user: {Emp_Email: any}) => {
              if (item.Emp_Email === user.Emp_Email){
                doesUserExist = true;
              }
            });
            if(!doesUserExist){
              this.mynew.push({
                ...item, 
                password: this.usersService.generatePwd(),
              })
            }
          });

          this.mynew.forEach(((newUser: any) => {
            users.push(newUser)
            this.apiServ.genericPost('/sendPassword', newUser)
              .subscribe({
                next: (res) => {console.log(res)},
                error: (err) => {console.log(err)},
                complete: () => {}
              })
          }))

        localStorage.setItem('users', JSON.stringify(data))
          this.mynew.forEach((user: any) => {
          });
        }
        if (!this.dataSource) {
          this.dataSource = new MatTableDataSource<any>();
        }
        this.users.push(...data);
        // Update the data source
        this.dataSource.data = this.users;

        this.users.forEach((user: any) => {
          this.sharedService.genericPost('/addUser', user)
            .subscribe({
              next: (res: any) => {
                localStorage.setItem('users', JSON.stringify(res));
              },
              error: (err: any) => this.snackbar.open(err.error, 'Ok', { duration: 3000 }),
              complete: () => { }
            })
        })
      })
      console.log(workbook);
    }
  }
}