import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;
  saCellphoneRegex = /^(\+?27|0)(\d{9})$/;
  registrationForm: FormGroup;
  constructor(private snackbar: MatSnackBar ,private api:ApiService , private router:Router){
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Idnumber: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl('', [Validators.required ]),
      address: new FormGroup({
        streetName: new FormControl('', [Validators.required]),
        streetNumber: new FormControl(null, [Validators.required]),
        suburb: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        code: new FormControl(null, [Validators.required]),

      }),

      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }
  
    submit(): void {
      if (this.registrationForm.invalid) return;
  
      if (this.registrationForm.get('password')?.value !== this.registrationForm.get('confirmPassword')?.value) {
        this.registrationForm.get('confirmPassword')?.setErrors({ 'pattern': true });
        return;
      }
  
      let formValue = this.registrationForm.value;
      delete formValue.confirmPassword; // Remove password from Form Value
  
      this.api.genericPost('/add-client', formValue)
        .subscribe({
          next: (res: any) => {
           console.log ('done')
           this.router.navigate(['/login']);
          },
          error: (err: any) => console.log('Error', err),
          complete: () => { }
        });
    }
}

