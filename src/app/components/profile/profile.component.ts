import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  {

  editF: boolean = false
 
profiles:any;
editform:FormGroup;
  constructor() {
    console.log(this .profiles)
  this.editform = new FormGroup({
    email:new FormControl('', Validators.required),
     cellnumber: new FormControl('', Validators.required),
  })
  
  }
  ngOnInit():void {
   this.profiles =  JSON.parse(sessionStorage.getItem('currentUser') || '[]');
  }
    edit() {
      this.editF ?  this.editF=true : this.editF=true
    }
}