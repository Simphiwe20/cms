import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  inputData: any;
  // isUpdate: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditUserComponent>,
    private buildr: FormBuilder, private apiServ: ApisServicesService, private snackbar: MatSnackBar) {
    if (data) {
      // this.isUpdate = true;
    }
  }

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.data) {
      console.log('PATCHING')
      this.myForm.patchValue(this.data);
    }

  }

  editCurrentUser() {

    const formValue = this.myForm.value;
    this.apiServ.genericPut('/updateUser', formValue).subscribe(updatedUser => {
      this.ref.close({ data: updatedUser});
    }, error => {
      this.snackbar.open('Failed to update user', 'Ok', {duration: 3000})
    })
    // this.ref.close({ data: formValue })
    console.log(formValue)
  }

  closePopup() {
    this.ref.close();
  }

  myForm = this.buildr.group({
    Emp_ID: this.buildr.control(''),
    Emp_Name: this.buildr.control(''),
    Emp_Surname: this.buildr.control(''),
    Emp_DOB: this.buildr.control(''),
    Emp_Gender: this.buildr.control(''),
    Emp_Email: this.buildr.control(''),
  });
}
