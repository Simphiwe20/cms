import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  _claims = localStorage.getItem('claims');
  claimData = this._claims ? JSON.parse(this._claims) : []
  approvedClaimsCount: number = 0;
  reviewedClaimsCount: number = 0;
  submittedClaimsCount: number = 0;
  rejectedClaimsCount: number = 0
  totalClaims: number = this.claimData.length
  deathClaims: any;
  counts: any;
  constructor(private api: ApiService) {
    this.api.genericGet('/get-death-claims')
      .subscribe({
        next: (res) => {
          this.deathClaims = res
          this.deathClaims = this.deathClaims ? this.deathClaims.length : 0;
          this.counts = res
          console.log(this.deathClaims)
          this.approvedClaimsCount = this.counts.filter((claim:any) => claim.status == 'Aproved').length
          this.reviewedClaimsCount = this.counts.filter((claim:any) => claim.status == 'Reviewed').length
          this.submittedClaimsCount = this.counts.filter((claim:any) => claim.status == 'Submitted').length
          this.rejectedClaimsCount = this.counts.filter((claim:any) => claim.status == 'Rejected').length
          // this._claims = res
          console.log(this.approvedClaimsCount)
        },
        error: (err) => { console.log(err) },
        complete: () => { }
      })

  }
  countApprovedClaims(): any {
    return this.approvedClaimsCount = this.claimData.filter((claim: any) => claim.status === "Approved").length;
  }
  countReviewedClaims(): any {
    return this.reviewedClaimsCount = this.claimData.filter((claim: any) => claim.status === "Reviewed").length;
  }
  countSubmittedClaims(): any {
    return this.submittedClaimsCount = this.claimData.filter((claim: any) => claim.status === "Submitted").length;
  }
}
