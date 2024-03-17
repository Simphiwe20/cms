import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-id-register',
  templateUrl: './id-register.component.html',
  styleUrls: ['./id-register.component.scss']
})
export class IdRegisterComponent {
  idForm: FormGroup
  show :boolean ;
  constructor( private router: Router){
    this.idForm = new FormGroup({
      Idnumber:new FormControl('',Validators.required)
    })
   this.show = true;
  }
 
  idnumber0: any = '0012310134080'
submit():any {
  if (this.idForm.get('Idnumber')?.value !== this.idnumber0){
    return this.show= true
  }else{
    this.show=false
    this.router.navigate(['/register']);
  }
}
}
