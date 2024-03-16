import { isNgTemplate } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  editF: boolean = false

editform:FormGroup;
  constructor(public api: ApiService) {
  this.editform = new FormGroup({
    email:new FormControl('', Validators.required),
     cellnumber: new FormControl('', Validators.required),
  })
  
}

  profiles: any[] = [
    {
      name: 'Angel',
      surname: 'Nthebe',
      address: '327 Mosiliki Jozi ',
      id: '123456789',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'Female',
      policyNumber: 'ABC123',
      email: 'angel@gmail.com',
      contact: '1234567890'
    }]
    
    edit() {
      this.editF ?  this.editF=true : this.editF=true
    }

}
