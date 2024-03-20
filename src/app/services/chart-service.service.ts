import { Injectable } from '@angular/core';
import { ApisServicesService } from './apis-services.service';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {
  approved: number = 0
  rejected: number = 0
  submitted: number = 0
  reviewed: number = 0
  deathclaim: any;

  constructor(private api: ApisServicesService) { 

  }

  getClaimsStatus() {
    this.api.genericGet('/add-death-claim')
      .subscribe({
        next: (res) => {console.log(res)
          // this.deathclaim.forEach((claim: any,))
          
        },
        error: (err) => {console.log(err)
        },
        complete: () => {}
      })
  }


}
