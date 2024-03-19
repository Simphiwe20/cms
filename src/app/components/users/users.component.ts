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

  // dataSource: any;
  fileUpload(event: any) {
    console.log(event.target.files);
    // Assinging the event/selected file to a variable
    const selectedFile = event.target.files[0];
    // An object to read the file
    const fileReader = new FileReader();
    // Using the method readAsBinaryString to read the file by passing it
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      console.log(event);
      // taking the binary data from the file reader bc thats the method we used.
      let binaryData = event.target?.result;
      // Read the binary data after npm install and import of xlsx
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      // Loop through Workbook.sheet names
      workbook.SheetNames.forEach(sheet => {
        // Using the XLSX method to convert sheet to JSON, and we are passing our sheetts which are in our workbook
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data);

        // Stringyfy the data
        this.convertedJson = JSON.stringify(data, undefined, 4);
        localStorage.setItem('users', JSON.stringify(data))
        if (!this.dataSource) {
          this.dataSource = new MatTableDataSource<any>();
        }
        // Push new data to the existing array
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