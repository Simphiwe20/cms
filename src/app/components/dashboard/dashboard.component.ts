import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  _claims: any;
  // claimData = this._claims ? JSON.parse(this._claims) : []
  approvedClaimsCount: number = 0;
  reviewedClaimsCount: number = 0;
  submittedClaimsCount: number = 0;
  rejectedClaimsCount: number = 0
  // totalClaims: number = this.claimData.length
  deathClaims: any;
  propClaims:any;
  publicClaims: any

  counts: any;
  constructor(private api: ApiService) {
    this.api.genericGet('/get-death-claims')
      .subscribe({
        next: (res) => {
          this.deathClaims = res
          this.deathClaims = this.deathClaims ? this.deathClaims.length : 0;
          this.counts = res
          console.log(this.deathClaims)
          this.approvedClaimsCount = this.counts.filter((claim:any) => claim.status == 'Approved').length
          this.reviewedClaimsCount = this.counts.filter((claim:any) => claim.status == 'Reviewed').length
          this.submittedClaimsCount = this.counts.filter((claim:any) => claim.status == 'Submitted').length
          this.rejectedClaimsCount = this.counts.filter((claim:any) => claim.status == 'Rejected').length
          // this._claims = res
          console.log( 'Approved', this.approvedClaimsCount)
        },
        error: (err) => { console.log(err) },
        complete: () => { }
      })

      this.getPublicCount()
      this.getPropCount()

  }


  getPropCount() {
    this.api.genericGet('/get-prop-claims')
    .subscribe({
      next: (res) => {
        this.propClaims = res
        this.propClaims = this.propClaims ? this.propClaims.length :0
        this._claims = res
        console.log(res)
        this.approvedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Approved').length
        this.reviewedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Reviewed').length
        this.submittedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Submitted').length
        this.rejectedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Rejected').length
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }

  getPublicCount() {
    this.api.genericGet('/get-public-claims')
    .subscribe({
      next: (res) => {
        this.publicClaims = res
        this.publicClaims = this.publicClaims ? this.publicClaims.length :0
        this._claims = res
        console.log(res)
        this.approvedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Approved').length
        this.reviewedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Reviewed').length
        this.submittedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Submitted').length
        this.rejectedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Rejected').length
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }

}
