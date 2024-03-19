import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{
  inputData:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private ref: MatDialogRef<AddUserComponent>,
  private buildr: FormBuilder, private apiServ: ApisServicesService, private snackbar: MatSnackBar ){}

  ngOnInit(): void {
    this.inputData = this.data;
  }

  closePopup(){
    this.ref.close();
  }

  myForm = this.buildr.group({
    Emp_ID:this.buildr.control(''),
    Emp_Name:this.buildr.control(''),
    Emp_Surname:this.buildr.control(''),
    Emp_DOB:this.buildr.control(''),
    Emp_Gender:this.buildr.control(''),
    Emp_Email:this.buildr.control(''),
  });

  saveUser(){
    if (this.myForm.invalid) return;
    let formValue = this.myForm.value;
    this.apiServ.genericPost('/addUser', formValue)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('users', JSON.stringify(res));
        },
        error: (err: any) => this.snackbar.open(err.error, 'Ok', { duration: 3000 }),
        complete: () => { } 
      })
    this.ref.close({data: formValue})
  }

}