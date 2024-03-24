import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  loginForm: FormGroup;
  user: any;
  users: any;

  constructor(private api: ApiService, private snackBar: MatSnackBar, private router: Router,
    private shared: SharedServicesService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })

  }

  ngOnInit(): void {
    // this.api.genericGet('/get-all-users')
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res)
    //       this.users = res
    //       console.log(this.users)
    //       this.api.genericPost('/add-user', this.adminAccount)
    //         .subscribe({
    //           next: (res) => { console.log(res) },
    //           error: (err) => { console.log(err) },
    //           complete: () => { }
    //         })
    //     },
    //     error: (err) => console.log(err),
    //     complete: () => { }
    //   })     
  }


  hide = true;

  signIn(): any {

    console.log(this.loginForm)
    if (!this.loginForm.valid) return
    let logInForm = this.loginForm.value

    this.api.genericPost('/log-in', logInForm)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/home'])
          this.shared.storeUser('currentUser', res, 'session')
        },
        error: (err) => {
          this.snackBar.open(err.error.Error, 'OK', { duration: 3000 })
          console.log(err)
        },
        complete: () => { }
      })
  }

}
