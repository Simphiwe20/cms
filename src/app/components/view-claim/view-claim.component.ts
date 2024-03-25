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
  files: any[] = [];
  deathClaimFiles: any[] = [{ docType: 'deceased ID', icon: 'description', fileId: null }, { docType: 'Death certificate', icon: 'description', fileId: null }]
  propClaimFiles: any[] = [{ docType: 'PH\'s ID', icon: 'description', fileId: null }, { docType: 'Loss proof', icon: 'description', fileId: null }]
  publicClaimFiles: any[] = [{ docType: 'PH\'s ID', icon: 'description', fileId: null }, { docType: 'damage proof', icon: 'description', fileId: null }]
  deathClaims: any;
  propertyClaims: any;
  publicClaims: any;
  foundFiles: any;
  url: any;

  constructor(private dialogRef: MatDialogRef<ViewClaimComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private api: ApisServicesService) {
    this.client = data
    console.log(this.client)

    this.getDeathFiles()
    this.getPropFiles()
    this.getPublicFiles()

  }

  close() {
    this.dialogRef.close()
  }

  getDeathFiles() {
    this.api.genericGet('/get-death-claims')
      .subscribe({
        next: (res) => {
          this.deathClaims = res
          this.deathClaims.forEach((claim: any, indx: number) => {
            if (claim.memberID == this.client.memberID) {
              // this.files.push({ docType: 'deceased ID', icon: 'description', fileId: null }, { docType: 'Death certificate', icon: 'description', fileId: null });
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

  getPropFiles() {
    this.api.genericGet('/get-prop-claims')
      .subscribe({
        next: (res) => {
          this.propertyClaims = res
          this.propertyClaims.forEach((claim: any, indx: number) => {
            if (claim.memberID == this.client.memberID) {
              // this.files.push({ docType: 'PH\'s ID', icon: 'description', fileId: null }, { docType: 'Loss proof', icon: 'description', fileId: null });
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

  getPublicFiles() {
    this.api.genericGet('/get-public-claims')
      .subscribe({
        next: (res) => {
          this.publicClaims = res
          this.publicClaims.forEach((claim: any, indx: number) => {
            if (claim.memberID == this.client.memberID) {
              // this.files.push({ docType: 'PH\'s ID', icon: 'description', fileId: null }, { docType: 'damage proof', icon: 'description', fileId: null });
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
            if (file.commonId.includes('death')) {
              this.deathClaimFiles[indx]['fileId'] = file.fileId
            }else if (file.commonId.includes('public')) {
              this.publicClaimFiles[indx]['fileId'] = file.fileId
            }else {
              this.propClaimFiles[indx]['fileId'] = file.fileId
            }
          })
        },
        error: () => { },
        complete: () => { }
      })
  }

  viewFile(fileID: any) {
    console.log(fileID)
    this.api.genericGet(`/download-files/${fileID}`)
      .subscribe({
        next: (res) => {
          console.log(res)
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
