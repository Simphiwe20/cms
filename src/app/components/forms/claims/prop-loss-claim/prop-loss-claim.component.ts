import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApisServicesService } from 'src/app/services/apis-services.service';

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

  constructor(private api: ApisServicesService) {
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
  }

  removeItem(i: number): any {
    this.getItems().removeAt(i)
    this.getItems()
    if (!this.getItems().length) {
      this.isAdded = false
    }
  }

  submit() {

    let formValues = this.claimForm.value
    console.log(formValues)
    if (!formValues.valid) return

      this.api.genericPost('/add-property-claim', formValues)
        .subscribe({
          next: (res) => {console.log(res) },
          error: (err) => {console.log(err)},
          complete: () => { }
        })

    console.log(this.claimForm)
  }
}
