import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApisServicesService } from 'src/app/services/apis-services.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-prop-loss-claim',
  templateUrl: './prop-loss-claim.component.html',
  styleUrls: ['./prop-loss-claim.component.scss']
})
export class PropLossClaimComponent implements OnChanges {

  count: Number = 0
  isAdded: boolean = false
  claimForm!: FormGroup
  @Input() client: any;
  currentUser: any;
  fileElement: any;
  fileElement1: any;
  fileUploadResult: any = 0;
  uploadedfiles: File[][] = [];
  formData: FormData[] = []

  lossDetails: FormGroup = new FormGroup({
    dateTime: new FormControl('', [Validators.required]),
    discoveryTime: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    lossState: new FormControl('', [Validators.required]),
    premises: new FormControl('', [Validators.required]),
    byWhom: new FormControl(''),
    lastOccuppied: new FormControl(''),
    forceEntry: new FormControl(''),
    forcedDetails: new FormControl(''),
    evidence: new FormControl(''),
    alarmActivation: new FormControl('', [Validators.required]),
    alarmCompany: new FormControl('', [Validators.required]),

  })

  item: FormGroup = new FormGroup({
    itemNum: new FormControl(''),
    make: new FormControl(''),
    purchaseLocation: new FormControl(''),
    value: new FormControl('')
  })

  constructor(private api: ApisServicesService, private shared: SharedServicesService,
     private snackBar: MatSnackBar) {
    this.currentUser = this.shared.getUser('currentUser', 'session')

    this.claimForm = new FormGroup({
      lossDetails: this.lossDetails,
      items: new FormArray([]),
    })


  }


  ngOnChanges(changes: SimpleChanges): void {
    this.client = this.client
    console.log(changes)
  }

  // Adding Items details
  getItems(): FormArray {
    return this.claimForm.get('items') as FormArray
  }

  addItem(): void {
    this.getItems().controls.push(this.item)
    this.isAdded = true
    this.count
    this.claimForm.updateValueAndValidity();
  }

  removeItem(i: number): any {
    this.getItems().removeAt(i)
    this.getItems()
    if (!this.getItems().length) {
      this.isAdded = false
    }
    this.claimForm.updateValueAndValidity();
  }

  submit() {


    // Manually validate each control in the FormArray
    this.getItems().controls.forEach(control => {
      control.markAsTouched(); // Mark control as touched to trigger validation
      control.updateValueAndValidity(); // Validate control
      console.log(control.valid); // Log validity state of each control
    });

    let formValues = this.claimForm.getRawValue()
    formValues['memberID'] = this.currentUser.role === 'agent' ? this.client.memberID : this.currentUser.memberID
    formValues['status'] = this.currentUser.role === 'agent' ? 'Reviewed' : 'Submitted'
    formValues['dateSubmitted'] = new Date()
    formValues['claimID'] = `Claim-${new Date().getFullYear()}${Math.floor(Math.random() * (500 - 100) + 100)}`
    formValues['submittedBy'] = this.shared.getWhoSubmitted()

    console.log(formValues)
    console.log(this.claimForm)

    if (!this.claimForm.valid) return
    console.log(this.claimForm)

    const formData = new FormData();
    this.uploadedfiles.forEach((fileArray, index) => {
      fileArray.forEach((file, subIndex) => {
        formData.append(`file${index + 1}-${subIndex + 1}`, file);
      });
    })

    this.shared.uploadFiles(this.uploadedfiles, '/upload-prop-files')
      .then((res) => console.log(res)),
      // .catch((err) => console.log(err))

    this.api.genericPost('/add-property-claim', formValues)
      .subscribe({
        next: (res) => { console.log(res) },
        error: (err) => { console.log(err) },
        complete: () => { }
      })
    console.log(this.claimForm)
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


