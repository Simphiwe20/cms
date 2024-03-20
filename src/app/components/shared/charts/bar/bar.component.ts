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
  approvedClaimsCount: number = 0;
  reviewedClaimsCount:number =0;
  submittedClaimsCount:number =0
  constructor() {
    this.countApprovedClaims();
    this.countReviewedClaims();
    this.countSubmittedClaims()
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

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ ' death policy', 'Property Loss and Damage Claim', 'Public Liability Claim' ],
    datasets: [
      { data: [ this.countApprovedClaims()  ], label: 'approved' },
      { data: [  this.countReviewedClaims() ], label: 'Reviewed' },
      { data: [ this.countSubmittedClaims() ], label: 'Submitted' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
}
