import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-death-claim',
  templateUrl: './death-claim.component.html',
  styleUrls: ['./death-claim.component.scss']
})
export class DeathClaimComponent implements AfterViewInit {

  deathCauses: any[] = ['Natural cause', 'terminal illness', 'Motor vehicle', 'Suicide', 'Murder', 'Other']
  deathLocation: any[] = [{ place: 'Hospital', value: 'Hospital' }, { place: 'Clinic', value: 'Clinic' }, { place: 'Home', value: 'Home' }, { place: 'Other', value: 'Other' }]

  deathClaimForm!: FormGroup
  fileElement: any;
  fileUploadResult: any = 0;
  files: any[] = [];


  attachment: FormGroup = new FormGroup({
    Id: new FormControl('', [Validators.required]),
    deathCert: new FormControl('', [Validators.required]),

  })

  deceasedDetails: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    idNum: new FormControl('', [Validators.required]),
    deathDate: new FormControl('', [Validators.required]),
    deathCause: new FormControl('', [Validators.required]),
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

  constructor(private api: ApisServicesService) {

    this.deathClaimForm = new FormGroup({
      deceasedDetails: this.deceasedDetails,
      undertakerDetails: this.undertakerDetails,
      // attachment: this.attachment
    })
  }

  ngAfterViewInit(): void {
    this.fileElement = document.querySelectorAll('.file1');
  }

  submit() {
    let formValues = this.deathClaimForm.value
    console.log(formValues)
    console.log(this.deathClaimForm)
    if (!this.deathClaimForm.valid) return

    const formData = new FormData();
    this.files.forEach((file: any, indx: number) => {
      formData.append('file', file, file.name);
    })
    this.api.genericPost('/upload', formData)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
        complete: () => { }
      })
    this.api.genericPost('/add-death-claim', this.deathClaimForm.value)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
        complete: () => { }
      })
  }

  fileUpload(e: any): void {
    console.log(e)
    e.target.files.forEach((file: any, indx: number) => {
       this.files[indx] = file 
    })
    console.log(this.files)
    const reader = new FileReader();
    console.log('reader', reader)
    console.log(this.fileElement)
    console.log('files', this.fileElement.files.length)
    this.fileUploadResult = this.fileElement.files.length
  }
}
