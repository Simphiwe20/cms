import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-death-claim',
  templateUrl: './death-claim.component.html',
  styleUrls: ['./death-claim.component.scss']
})
export class DeathClaimComponent {

  deathClaimForm!: FormGroup
  deceasedDetails: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    idNum: new FormControl('', [Validators.required]),
    claimerName: new FormControl('', [Validators.required]),
    deceasedRelationship: new FormControl('', [Validators.required]),
    phRelationship: new FormControl('', [Validators.required]),
    hospital: new FormControl('', [Validators.required]),
    telNo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])  
  })
  policeStationDetails: FormGroup = new FormGroup({
    policeStationTelNo: new FormControl('', [Validators.required]),
    policeStationCaseNo: new FormControl('', [Validators.required]),
    policeStationName: new FormControl('', [Validators.required]),
    investigatorName: new FormControl('', [Validators.required]),
    investigatorContact: new FormControl('', [Validators.required])

  })
  accidentDetails: FormGroup = new FormGroup({
    accidentDate: new FormControl('', [Validators.required]),
    accidentTime: new FormControl('', [Validators.required]),
    accidentLocation: new FormControl('', [Validators.required]),
    policeStationDetails: this.policeStationDetails,
    accidentDescription: new FormControl('', Validators.required)

  })

  constructor(private api: ApisServicesService) {

    this.deathClaimForm = new FormGroup({
      deceasedDetails: this.deceasedDetails,
      accidentDetails: this.accidentDetails
    })
  }

  submit() {
    let formValues = this.deathClaimForm.value
    console.log(formValues)
    console.log(this.deathClaimForm)
    if(!this.deathClaimForm.valid) return

    this.api.genericPost('/add-death-claim', this.deathClaimForm.value)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
        complete: () => {}
      })
    
  }
}
