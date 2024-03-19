import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-public-lia-claim',
  templateUrl: './public-lia-claim.component.html',
  styleUrls: ['./public-lia-claim.component.scss']
})
export class PublicLiaClaimComponent implements OnChanges {
  isAdded: boolean = false
  @Input() client: any;

  attachment: FormGroup = new FormGroup({
    Id: new FormControl('', [Validators.required]),
    proof: new FormControl('', [Validators.required])
  })
  publicLiabilityForm: FormGroup
  witnesses: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    cellPhoneNo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  })

  constructor() {
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
      propertyCar: new FormControl('', [Validators.required]),
      witnesses: new FormArray([]),
      hasInsuredInv: new FormControl('', [Validators.required]),
      insuredComment: new FormControl('', [Validators.required]),
      insuredOnAmount: new FormControl('', [Validators.required]),
      externalContributor: new FormControl('', [Validators.required]),
      additionalDetails: new FormControl('', [Validators.required]),
      attachment: this.attachment

    })
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

  }


}
