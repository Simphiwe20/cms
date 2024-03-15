import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-register-agent',
  templateUrl: './register-agent.component.html',
  styleUrls: ['./register-agent.component.scss']
})
export class RegisterAgentComponent {

  registerForm: FormGroup
  emailPattern: any = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
  numberPattern: any;

  constructor(private api: ApisServicesService) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      cellPhone: new FormControl('', [Validators.required, Validators.pattern(this.numberPattern)]),
      employeeID: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required, Validators.minLength(13)]),
      DOB: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])

    })

    this.api.genericGet('/internal-users')
      .subscribe({
        next: (res) => {console.log(res)},
        error: (err) => {console.log(err)},
        complete: () => {}
      })

    // console.log(this.registerForm.controls?['idNumber'].errors['minLength'])
  }

  submit() {
    let newUser = this.registerForm.controls['value']
    console.log(newUser) 


  }

}
