import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { window } from 'rxjs';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-view-claim',
  templateUrl: './view-claim.component.html',
  styleUrls: ['./view-claim.component.scss']
})
export class ViewClaimComponent {
  
  client: any;
  files: any[] = [{docType: 'deceased ID', icon: 'description', fileId: null}, {docType: 'Death certificate', icon: 'description', fileId: null}];
  deathClaims: any;
  foundFiles: any;
  url: any;

  constructor(private dialogRef: MatDialogRef<ViewClaimComponent>, 
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private api: ApisServicesService) {
    this.client = data
    console.log(this.client)
    
    this.getFiles()

  }

  close() {
    this.dialogRef.close()

  }

  getFiles() {
    this.api.genericGet('/get-death-claims')
      .subscribe({
        next: (res) => {
          this.deathClaims = res
          this.deathClaims.forEach((claim: any, indx: number) => {
            if (claim.memberID == this.client.memberID) {
              let fileId = claim.commonId
              this.openFile(fileId)
              console.log(fileId)
            }
          })
        },
        error: () => { },
        complete: () => { }
      })
  }

  openFile(fileID: any) {
    this.api.genericGet('/get-all-files')
      .subscribe({
        next: (res) => {
        console.log(res)
        this.foundFiles = res
        this.foundFiles = this.foundFiles['files'].filter((file: any, indx: number) => fileID === file.commonId)  
        console.log(this.foundFiles)
        this.foundFiles.forEach((file: any, indx: number) => {
          this.files[indx]['fileId'] = file.fileId
        })
        },
        error: () => {},
        complete: () => {}
      })
  }

  viewFile(fileID: any) {
    console.log(fileID)
    this.api.genericGet(`/download-files/${fileID}`)
    .subscribe({
      next: (res) => { console.log(res)
      },
      error: (err) => { 
        console.log(err) 
        this.url = err.url
      },
      complete: () => { }
    })

    // window.open()
  }
}
