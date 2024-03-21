import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApisServicesService } from 'src/app/services/apis-services.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent {

  changePasswordForm: FormGroup
  user: any
  users: any

  constructor(private api:ApisServicesService, private userInfor: SharedServicesService, private snackBar: MatSnackBar, private matDialogRef: MatDialogRef<ChangePwdComponent>) {

    this.user = this.userInfor.get('currentUser', 'session')
    this.users = this.api.genericGet('/get-users').subscribe((res) => {
      this.users = res;
    });

    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }
  save() {
    let currentPassword = this.user.password
    this.api.genericPost(`/checkPassword`, {
      plainPassword: this.changePasswordForm.value.currentPassword,
      hashedPassword: currentPassword
    }).subscribe((res) => {
      if (!res) {
        this.snackBar.open('Your current password is incorrect', 'OK', { duration: 3000 })
      } else {
        if (this.changePasswordForm['controls']['confirmPassword'].value === this.changePasswordForm['controls']['newPassword'].value) {
          console.log("this.user.email", this.user.email)
          this.users.forEach((user: any, indx: number) => {
            if(user.email === this.user.email) {
              user.password = this.changePasswordForm['controls']['newPassword'].value
              this.api.genericPost('/update-user-password',user).subscribe({
                 next: (res: any) => {
                  console.log('changi passw resp')
                 } });
            }
          })
          console.log("this.users.email", this.users.email)
          this.close()
          this.snackBar.open('Your password, hass been changed successfully', 'OK', { duration: 3000 })
  
        } else {
          this.snackBar.open('New password and confirm password doesn\'t match', 'OK', { duration: 3000 })
        }
      }

    })

  }


  close() {
    this.matDialogRef.close()
  }
}
