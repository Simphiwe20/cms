import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

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
  internalUser: boolean = false
  roles: Array<any> = [{value: "agent", option: "Agent"}, {value: "admin", option: "Admin"}]
  genders: Array<any> = [{value: "male", option: "Male"}, {value: "female", option: "Female"}]

  constructor(private snackbar: MatSnackBar, private api: ApiService, private router: Router,
    private route: ActivatedRoute, private sharedService: SharedServicesService) {

    this.route.queryParams?.subscribe(params => {
      this.receivedClient = JSON.parse(params['data'])
      console.log(this.receivedClient)
    })

    if (!this.receivedClient?.firstName) {
      this.internalUser = true
    }

    this.registrationForm = this.sharedService.getFormControl(this.internalUser, this.receivedClient)
    console.log("register: ", this.registrationForm)
  }

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

    this.setUserDetails(formValue)
    console.log(formValue)

    this.api.genericPost('/add-user', formValue)
      .subscribe({
        next: (res: any) => {
          if(this.internalUser) {
            this.sharedService.sendPwd(formValue)
            let newUser = `${formValue.firstName} ${formValue.lastName}`
            this.router.navigate(['/feedback'], {queryParams: {data: JSON.stringify(newUser)}})
            return
          }
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.log('Error', err)
          this.snackbar.open(err.error, 'OK', { duration: 3000 })
        },
        complete: () => { }
      });
  }

  setUserDetails(formValue: any): void {
    formValue['status'] = 'active'

    if (!this.internalUser) {
      formValue['role'] = 'claimer',
      formValue['startDate'] = this.receivedClient.startDate
      formValue['memberID'] = this.receivedClient.memberID
    }else {
      formValue['password'] = this.sharedService.generatePwd()
      formValue['startDate'] = new Date()
    }
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

