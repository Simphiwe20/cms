import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-claims',
  templateUrl: './add-claims.component.html',
  styleUrls: ['./add-claims.component.scss']
})
export class AddClaimsComponent {

  isAdded: boolean = false
  claimForm!: FormGroup
  lossDetails: FormGroup = new FormGroup({
      dateTime: new FormControl('', [Validators.required]),
      discoveryTime: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      lossState: new FormControl('', [Validators.required]),
      premises: new FormControl('', [Validators.required]),
      byWhom: new FormControl('', [Validators.required]),
      lastOccuppied: new FormControl('', [Validators.required]),
      forceEntry: new FormControl('', [Validators.required]),
      forcedDetails: new FormControl('', [Validators.required]),
      evidence: new FormControl('', [Validators.required]),
      alarmActivation: new FormControl('', [Validators.required]),
      alarmCompany: new FormControl('', [Validators.required]),
      
    }) 

  item: FormGroup = new FormGroup({
    itemNum: new FormControl('', Validators.required),
    make: new FormControl('', Validators.required),
    serial_number: new FormControl('', Validators.required),
    purchaseLocation: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required)
  })

  constructor() {
     this.claimForm = new FormGroup({
    lossDetails: this.lossDetails,
    items: new FormArray([])

  })
  }

   // Adding tertiaries details
   getItems(): FormArray {
    return this.claimForm.get('items') as FormArray
  }

  addItem(): void {
    console.log(this.getItems().controls)
    this.getItems().controls.push(this.item)
    this.isAdded = true
  }

  removeItem(i: number): any {
    this.getItems().removeAt(i)
    this.getItems()
    if (!this.getItems().length) {
      this.isAdded = false
    }
  }

  submit() {

  }

 
}
