import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-read-reason',
  templateUrl: './read-reason.component.html',
  styleUrls: ['./read-reason.component.scss']
})
export class ReadReasonComponent {
  rejectReason: any;

  constructor(public dialogRef: MatDialogRef<ReadReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    { this.rejectReason = this.data.rejectReason; 
      console.log('rejected reason', this.rejectReason) }




  close() {
    this.dialogRef.close()
  }

}
