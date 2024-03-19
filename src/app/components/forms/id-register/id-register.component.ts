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
  constructor(private router: Router, private api: ApiService, private snackbar: MatSnackBar) {
    this.idForm = new FormGroup({
      Idnumber: new FormControl('', Validators.required)
    })


  }
  idnumber0: any

  // submit(): any {

  //   if (this.idForm.get('Idnumber')?.value !== this.idnumber0) {
  //     this.show = true
  //   } else {
  //     this.show = false
  //     this.router.navigate(['/register']);
  //   }
  // }
  cancel() {
    this.router.navigate(['/landing']);
  }

  isFound: any;
  submit(): any {
    this.idnumber0 = this.idForm.value;
    this.api.genericPost('/get-client', this.idnumber0)
      .subscribe({
        next: async (res: any) => {

          console.log('found', res)
          console.log("looking for", res.Idnumber)
          console.log("form", this.idnumber0.Idnumber)
          const found = res
          if (res.Idnumber != this.idnumber0.Idnumber) {
            this.show = true
          } else {
            this.show = false
            this.router.navigate(['/register']);
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });

  }
}


