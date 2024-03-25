import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule, Form } from '@angular/forms';
// import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApisServicesService } from 'src/app/services/apis-services.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-forgotpasword',
  templateUrl: './forgotpasword.component.html',
  styleUrls: ['./forgotpasword.component.scss']
})
export class ForgotpaswordComponent {
  forgotPasswordForm: FormGroup;
  user: any;
  newpwd: any;

  constructor(private router: Router, private snackBar: MatSnackBar, private api: ApisServicesService, private shared: SharedServicesService,
    private dialogRef: MatDialogRef<ForgotpaswordComponent>) {

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      idNumber: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    })
  }

  sendEmail(): void {

    let formValue = this.forgotPasswordForm.value

    this.api.genericPost('/get-users', formValue)
      .subscribe({
        next: (res) => {
          console.log(formValue)
          console.log(res)
          this.user = res
          this.user['password'] = this.shared.generatePwd()
          this.api.genericPut('/updates-user', this.user)
            .subscribe({
              next: (_res1) => {
                console.log(_res1)
                this.api.genericPost('/sendNewPassword', this.user)
                  .subscribe({
                    next: (_res2) => {
                      this.newpwd = _res2
                      this.close(this.newpwd)
                      console.log(this.newpwd)
                      console.log(this.newpwd)
                    },
                    error: (err) => {
                      console.log(err)
                    },
                    complete: () => { }
                  })
              },
              error: () => { },
              complete: () => { }
            })
        },
        error: (err) => {
          console.log(err)
          if (err.status == 401) {
            this.snackBar.open(err.error.Error, 'OK', {duration: 3000})
          }
        },
        complete: () => { }
      })

  }

  resetForm() {
    this.forgotPasswordForm.reset();
  }

  close(user: any = "cancel") {
    this.dialogRef.close(user)
  }
}