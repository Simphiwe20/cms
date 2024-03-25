import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApisServicesService } from 'src/app/services/apis-services.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-public-lia-claim',
  templateUrl: './public-lia-claim.component.html',
  styleUrls: ['./public-lia-claim.component.scss']
})
export class PublicLiaClaimComponent implements OnChanges {
  count: Number = 0
  isAdded: boolean = false
  @Input() client: any;
  currentUser: any;
  fileElement: any;
  fileElement1: any;
  fileUploadResult: any = 0;
  uploadedfiles: File[][] = [];
  formData: FormData[] = []

  attachment: FormGroup = new FormGroup({
    Id: new FormControl('', [Validators.required]),
    proof: new FormControl('', [Validators.required])
  })
  publicLiabilityForm: FormGroup
  witnesses: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('',),
    cellPhoneNo: new FormControl(''),
    email: new FormControl('')
  })

  constructor(private api: ApisServicesService, private shared: SharedServicesService, private snackBar: MatSnackBar) {
    this.publicLiabilityForm = new FormGroup({
      thirdPatryFullName: new FormControl('', Validators.required),
      thirdPartyEmail: new FormControl('', Validators.required),
      thirdPartyCellPhone: new FormControl('', [Validators.required]),
      incidentDate: new FormControl('', [Validators.required]),
      incidentTime: new FormControl('', [Validators.required]),
      incidentLocation: new FormControl('', [Validators.required]),
      awareDate: new FormControl('', [Validators.required]),
      incidentDetails: new FormControl('', [Validators.required]),
      incidentCause: new FormControl('', [Validators.required]),
      previousIncident: new FormControl('', [Validators.required]),
      injuryDetail: new FormControl('', [Validators.required]),
      thirdPartConditions: new FormControl('', [Validators.required]),
      propertyOwner: new FormControl('', [Validators.required]),
      contactDetails: new FormControl('', [Validators.required]),
      damageDetails: new FormControl('', [Validators.required]),
      // propertyCar: new FormControl('', [Validators.required]),
      witnesses: new FormArray([]),
      hasInsuredInv: new FormControl(''),
      insuredComment: new FormControl(''),
      insuredOnAmount: new FormControl(''),
      externalContributor: new FormControl(''),
      additionalDetails: new FormControl(''),
    })

    this.currentUser = this.shared.getUser('currentUser', 'session')
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.client = this.client
    console.log(changes)
  }


  getWitnesses(): FormArray {
    return this.publicLiabilityForm.get('witnesses') as FormArray
  }

  addWitness(): void {
    console.log(this.getWitnesses().controls)
    this.getWitnesses().controls.push(this.witnesses)
    this.isAdded = true
  }

  removeWitness(i: number): any {
    this.getWitnesses().removeAt(i)
    this.getWitnesses()
    if (!this.getWitnesses().length) {
      this.isAdded = false
    }
  }

  submit() {


    // Manually validate each control in the FormArray
    this.getWitnesses().controls.forEach(control => {
      control.markAsTouched(); // Mark control as touched to trigger validation
      control.updateValueAndValidity(); // Validate control
      console.log(control.valid); // Log validity state of each control
    });

    let formValues = this.publicLiabilityForm.getRawValue()
    formValues['memberID'] = this.currentUser.role === 'agent' ? this.client.memberID : this.currentUser.memberID
    formValues['status'] = this.currentUser.role === 'agent' ? 'Reviewed' : 'Submitted'
    formValues['dateSubmitted'] = new Date()
    formValues['claimID'] = `Claim-${new Date().getFullYear()}${Math.floor(Math.random() * (500 - 100) + 100)}`
    formValues['submittedBy'] = this.shared.getWhoSubmitted()

    console.log(formValues)
    console.log(this.publicLiabilityForm)

    if (!this.publicLiabilityForm.valid) return
    console.log(this.publicLiabilityForm)

    const formData = new FormData();
    this.uploadedfiles.forEach((fileArray, index) => {
      fileArray.forEach((file, subIndex) => {
        formData.append(`file${index + 1}-${subIndex + 1}`, file);
      });
    })

    this.shared.uploadFiles(this.uploadedfiles, '/upload-public-files')
      .then((res) => console.log(res)),
      // .catch((err) => console.log(err))

    this.api.genericPost('/add-public-claim', formValues)
      .subscribe({
        next: (res) => { console.log(res) },
        error: (err) => { console.log(err) },
        complete: () => { }
      })
    console.log(this.publicLiabilityForm)
    this.snackBar.open(`Member ID: ${formValues.memberID}'s Claim has been successfully submitted`, 'OK', { duration: 3000 })
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
