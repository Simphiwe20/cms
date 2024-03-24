import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-reject-reason',
  templateUrl: './reject-reason.component.html',
  styleUrls: ['./reject-reason.component.scss']
})
export class RejectReasonComponent implements OnInit{
  rejectReason: string = '';
  // rejectReason: {reason: string} = {reason: ''};


  constructor(public dialogRef: MatDialogRef<RejectReasonComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private sharedSer: SharedServicesService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    console.log(this.rejectReason)
    //Assing reject reason to the reason property
    this.rejectReason = this.rejectReason;
    // this.rejectReason'reason'
    // Close the dialog and pass the reject reason
    this.dialogRef.close(this.rejectReason);
    this.sharedSer.getReason(this.rejectReason)
  }



  close() {
    this.dialogRef.close()
  }

}
