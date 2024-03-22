import { Component, Output } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})

export class BarComponent {
  _claims = localStorage.getItem('claims');
  claimData = this. _claims ? JSON.parse(this._claims) : []
  deathClaims: any;
  counts: any;
  approvedClaimsCount: number = 0;
  reviewedClaimsCount:number =0;
  submittedClaimsCount:number =0
  rejectedClaimsCount: number = 0;
  constructor(private api: ApisServicesService) {
    // this.countApprovedClaims();
    // this.countReviewedClaims();
    // this.countSubmittedClaims()

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
   return this.approvedClaimsCount = this.claimData.filter((claim:any) => claim.status === "Approved").length;
  }
  countReviewedClaims(): any {
    return this.reviewedClaimsCount = this.claimData.filter((claim:any) => claim.status === "Reviewed").length;
   }
   countSubmittedClaims(): any {
    return this.submittedClaimsCount = this.claimData.filter((claim:any) => claim.status === "Submitted").length;
   }
  public barChartLegend = true;
  public barChartPlugins = [];

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ ' Death Claim', 'Property Loss and Damage Claim', 'Public Liability Claim' ],
    datasets: [
      { data: [ this.approvedClaimsCount  ], label: 'approved' },
      { data: [  this.countReviewedClaims() ], label: 'Reviewed' },
      { data: [ this.countSubmittedClaims() ], label: 'Submitted' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
}
