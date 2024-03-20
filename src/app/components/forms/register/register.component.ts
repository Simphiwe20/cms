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
  saCellphoneRegex =/^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;
  idpattern  = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
  registrationForm: FormGroup;
  constructor(private snackbar: MatSnackBar ,private api:ApiService , private router:Router){
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Idnumber: new FormControl('', [Validators.required , Validators.pattern(this.idpattern)]),
      gender: new FormControl('', [Validators.required]),
      // dateOfBirth:new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl('', [Validators.required , Validators.pattern(this.saCellphoneRegex) ]),
      address: new FormGroup({
        streetName: new FormControl('', [Validators.required]),
        streetNumber: new FormControl(null, [Validators.required]),
        suburb: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        code: new FormControl(null, [Validators.required , Validators.max(9999)]),

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
           console.log ('done' ,res)
           this.router.navigate(['/login']);
          },
          error: (err: any) => console.log('Error', err),
          complete: () => { }
        });
    }
  //   extractBirthDate(idNumber: string):void{
  //     if (idNumber.length !== 13){
  //       console.log( "nope")
  //     }else(idNumber.length === 13);{
  //     const year = parseInt(idNumber.substr(0, 2));
  //     const month = parseInt(idNumber.substr(2, 2)) - 1;
  //     const day = parseInt(idNumber.substr(4, 2));
  //     const fullYear = year < 22 ? 2000 + year : 1900 + year;
  // console.log(new Date(fullYear, month, day));
  
  //   }
  // }
  onInput(value: string) {
    if (/\D/.test(value)) { // Check if value contains non-numeric characters
      this.snackbar.open('Only numeric characters are allowed!', 'Close', {
        duration: 5000 
      });
    }
  }
  
}

