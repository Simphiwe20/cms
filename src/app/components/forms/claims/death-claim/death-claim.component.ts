import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-death-claim',
  templateUrl: './death-claim.component.html',
  styleUrls: ['./death-claim.component.scss']
})
export class DeathClaimComponent {

  deathCauses: any[] = ['Natural cause', 'terminal illness', 'Motor vehicle', 'Suicide', 'Murder', 'Other']
  deathLocation: any[] = [{place: 'Hospital', value: 'Hospital'}, {place: 'Clinic', value: 'Clinic'}, {place: 'Home', value: 'Home'}, {place: 'Other', value: 'Other'}]

  deathClaimForm!: FormGroup
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
      undertakerDetails: this.undertakerDetails
    })
  }

  submit() {
    let formValues = this.deathClaimForm.value
    console.log(formValues)
    console.log(this.deathClaimForm)
    if (!this.deathClaimForm.valid) return

    this.api.genericPost('/add-death-claim', this.deathClaimForm.value)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
        complete: () => { }
      })

  }
}
