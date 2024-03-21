import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-id-register',
  templateUrl: './id-register.component.html',
  styleUrls: ['./id-register.component.scss']
})
export class IdRegisterComponent {
  idForm: FormGroup
  show!: boolean;
   idpattern :any = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
  constructor(private router: Router, private api: ApiService, private snackbar: MatSnackBar,) {
    this.idForm = new FormGroup({
      idNumber: new FormControl('', [Validators.required , Validators.pattern(this.idpattern)])
    })
  }

  
  idnumber0: any
 cancel() {
    this.router.navigate(['/landing']);
   
  } 

  isFound: any;
  submit(): any {
   
    this.idnumber0 = this.idForm.value;
    console.log("form",this.idnumber0)
    this.api.genericPost('/get-client', this.idnumber0.value)
      .subscribe({
        next: (res: any) => {

          console.log('found', res)
          // console.log("looking for", res)
          console.log("form", this.idnumber0.idNumber)
          const found = res
          if (!res) {
            this.show = true
           
          } else {
            this.show = false
            this.router.navigate(['/register'], {queryParams: {data: JSON.stringify(res)}});
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });

  }
  onInput(value: string) {
    if (/\D/.test(value)) { // Check if value contains non-numeric characters
      this.snackbar.open('Only numeric characters are allowed!', 'Close', {
        duration: 5000 
      });
    }
  }
  
}