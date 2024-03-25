import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  receivedClient: any
  client: any;
  hide = true;
  saCellphoneRegex = /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;
  idpattern = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
  registrationForm: FormGroup;

  constructor(private snackbar: MatSnackBar, private api: ApiService, private router: Router,
    private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.receivedClient = JSON.parse(params['data'])
      console.log(this.receivedClient)
    })

    this.registrationForm = new FormGroup({
      firstName: new FormControl({ value: `${this.receivedClient.firstName}`, disabled: true }, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl({ value: `${this.receivedClient.lastName}`, disabled: true }, [Validators.required, Validators.minLength(3)]),
      idNumber: new FormControl({ value: `${this.receivedClient.idNumber}`, disabled: true }, [Validators.required]),
      gender: new FormControl({ value: `${this.receivedClient.gender}`, disabled: true }, [Validators.required]),
      DOB: new FormControl(''),
      email: new FormControl({ value: `${this.receivedClient.email}`, disabled: true }, [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl({ value: `0${this.receivedClient.cellPhone}`, disabled: true }, [Validators.required]),
      address: new FormGroup({
        streetName: new FormControl({ value: `${this.receivedClient.address.streetName}`, disabled: true }, [Validators.required]),
        streetNumber: new FormControl({ value: `${this.receivedClient.address.streetNumber}`, disabled: true }, [Validators.required]),
        suburb: new FormControl({ value: `${this.receivedClient.address.suburb}`, disabled: true }, [Validators.required]),
        city: new FormControl({ value: `${this.receivedClient.address.city}`, disabled: true }, [Validators.required]),
        code: new FormControl({ value: `${this.receivedClient.address.code}`, disabled: true }, [Validators.required, Validators.max(9999)]),

      }),

      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  // ngOnInit(): void {

  // }

  submit(): void {
    console.log(this.registrationForm.getRawValue())
    console.log(this.registrationForm)
    if (this.registrationForm.invalid) return;

    if (this.registrationForm.get('password')?.value !== this.registrationForm.get('confirmPassword')?.value) {
      this.registrationForm.get('confirmPassword')?.setErrors({ 'pattern': true });
      return;
    }

    let formValue = this.registrationForm.getRawValue();
    delete formValue.confirmPassword; // Remove password from Form Value
    formValue['role'] = 'claimer',
      formValue['startDate'] = this.receivedClient.startDate
    formValue['memberID'] = this.receivedClient.memberID
    formValue['status'] = 'active'
    // this.getValues(formValue)
    console.log(formValue)

    this.api.genericPost('/add-user', formValue)
      .subscribe({
        next: (res: any) => {
          console.log('done')
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.log('Error', err)
          this.snackbar.open(err.error, 'OK', { duration: 3000 })
        },
        complete: () => { }
      });
  }

  extractBirthDate(idNumber: string): void {
    if (idNumber.length !== 13) {
      console.log("nope")
    } else (idNumber.length === 13); {
      const year = parseInt(idNumber.substr(0, 2));
      const month = parseInt(idNumber.substr(2, 2)) - 1;
      const day = parseInt(idNumber.substr(4, 2));
      const fullYear = year < 22 ? 2000 + year : 1900 + year;
      console.log(new Date(fullYear, month, day));

    }
  }
  onInput(value: string) {
    if (/\D/.test(value)) { // Check if value contains non-numeric characters
      this.snackbar.open('Only numeric characters are allowed!', 'Close', {
        duration: 5000
      });
    }
  }

  getValues(value: any) {
    this.api.genericGet('/get-clients')
      .subscribe({
        next: (res) => {
          this.client = res
          this.client.forEach((_client: any) => {
            if (_client.idNumber === value.idNumber) {
              value['memberID'] = _client.memberID
              value['startDate'] = _client.startDate
              value['role'] = 'claimer'
            }
          })
        },
        error: () => { },
        complete: () => { }
      })


  }
}

