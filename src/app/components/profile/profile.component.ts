import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePwdComponent } from '../popUps/change-pwd/change-pwd.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  editF: boolean = false

  profile: any;
  editform: FormGroup;
  constructor(private matDialog: MatDialog) {
    console.log(this.profile)
    this.editform = new FormGroup({
      email: new FormControl('', Validators.required),
      cellnumber: new FormControl('', Validators.required),
    })

  }
  ngOnInit(): void {
    this.profile = JSON.parse(sessionStorage.getItem('currentUser') || '[]');
  }
  edit() {
    this.editF ? this.editF = true : this.editF = true
  }
  changePwd() {
    console.log('Pop  up opened')
    const MatDialogRef= this.matDialog.open(ChangePwdComponent, {width: "40%"})
  }
}