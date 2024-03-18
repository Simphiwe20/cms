import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  {

  editF: boolean = false
 
profile:any;
editform:FormGroup;
  constructor() {
    console.log(this .profile)
  this.editform = new FormGroup({
    email:new FormControl('', Validators.required),
     cellnumber: new FormControl('', Validators.required),
  })
  
  }
  ngOnInit():void {
   this.profile =  JSON.parse(sessionStorage.getItem('currentUser') || '[]');
  }
    edit() {
      this.editF ?  this.editF=true : this.editF=true
    }
}