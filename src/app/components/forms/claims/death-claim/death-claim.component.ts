import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApisServicesService } from 'src/app/services/apis-services.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-death-claim',
  templateUrl: './death-claim.component.html',
  styleUrls: ['./death-claim.component.scss']
})
export class DeathClaimComponent implements AfterViewInit, OnChanges {

  deathCauses: any[] = ['Natural cause', 'terminal illness', 'Motor vehicle', 'Suicide', 'Murder', 'Other']
  deathLocation: any[] = [{ place: 'Hospital', value: 'Hospital' }, { place: 'Clinic', value: 'Clinic' }, { place: 'Home', value: 'Home' }, { place: 'Other', value: 'Other' }]

  @Input() client: any;
  deathClaimForm!: FormGroup
  fileElement: any;
  fileElement1: any;
  fileUploadResult: any = 0;
  uploadedfiles: File[][] = [];
  formData: FormData[] = []
  currentUser: any;
  maxDate = new Date()



  attachment: FormGroup = new FormGroup({
    Id: new FormControl('', [Validators.required]),
    deathCert: new FormControl('', [Validators.required]),

  })

  deceasedDetails: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    idNum: new FormControl('', [Validators.required, Validators.maxLength(13)]),
    deathDate: new FormControl('', [Validators.required]),
    deathCause: new FormControl('', [Validators.required]),
    Other:  new FormControl(''),
    certifiedPer: new FormControl('', [Validators.required]),
    telPhone: new FormControl('', [Validators.required]),
    deathPlace: new FormControl(''),
    admissionNo: new FormControl('', [Validators.required]),
  })
  undertakerDetails: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyNo: new FormControl('', [Validators.required]),
    businessAddress: new FormControl('', [Validators.required]),
    cellNo: new FormControl('', [Validators.required]),
    burialDate: new FormControl('', [Validators.required]),
    burialPlace: new FormControl('', [Validators.required])

  })

  constructor(private api: ApisServicesService, private shared: SharedServicesService,
      private snackBar: MatSnackBar) {

    this.currentUser = this.shared.getUser('currentUser', 'session')

    this.deathClaimForm = new FormGroup({
      deceasedDetails: this.deceasedDetails,
      undertakerDetails: this.undertakerDetails,
      // attachment: this.attachment
    })
  }

  ngAfterViewInit(): void {
    this.fileElement = document.getElementById('file');
    this.fileElement1 = document.getElementById('file1');

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.client = this.client
    console.log(changes)
  }

  submit() {
    let formValues = this.deathClaimForm.value
    formValues['memberID'] = this.currentUser.role === 'agent' ? this.client.memberID : this.currentUser.memberID
    formValues['status'] = this.currentUser.role === 'agent' ? 'Reviewed' : 'Submitted'
    formValues['dateSubmitted'] = new Date() 
    formValues['claimID'] = `Claim-${new Date().getFullYear()}${Math.floor(Math.random() * (500 - 100) + 100)}`
    formValues['submittedBy'] = this.shared.getWhoSubmitted()
  
    console.log(formValues)
    console.log(this.deathClaimForm)

    const formData = new FormData();
    this.uploadedfiles.forEach((fileArray, index) => {
      fileArray.forEach((file, subIndex) => {
        formData.append(`file${index + 1}-${subIndex + 1}`, file);
      });
    })

    if (!this.deathClaimForm.valid) return
    console.log('Form Data', formData)

    this.shared.uploadFiles(this.uploadedfiles, '/upload-death-files')
      .then((res) => console.log(res)),
      // .catch((err) => console.log(err))

    this.api.genericPost('/add-death-claim', this.deathClaimForm.value)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
        complete: () => { }
      })
    this.snackBar.open(`Member ID: ${formValues.memberID}'s Claim has been successfully submitted`, 'OK', {duration: 3000})
    this.deathClaimForm.reset()
  }

  fileUpload(e: any, inputIndex: number): void {
    const files: FileList = e.target.files;
    console.log(files)
    const fileArray: File[] = [];
    for (let i = 0; i < files.length; i++) {
      fileArray.push(files[i]);
    }
    this.uploadedfiles[inputIndex] = fileArray;
  }
}
