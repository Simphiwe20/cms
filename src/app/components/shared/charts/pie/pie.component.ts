import { Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {
 
  // status:any = this.claims.status

 
  approve:number =0 ;
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
  // }



  // constructor(){
    // this.countStatus();
   
    // for(let i =0 ;i< claims.length ;i++){
    //   if(claims[i].status ==='Approved'){
    //   this.approve +=this.approve
    //   }
    // }

//    console.log('number',claims.status)
//  console.log(this.aprovedcount())

  // }

  // statusCounts: { [status: string]: number } = {};
  // countStatus(): void {
  //   this.approvedClaimsCount = this.claimData.filter(claim => claim.status === "Approved").length;
    // this.claimData.forEach((claim: { status: string | number; }):any => {
    //   if (this.statusCounts[claim.status] ) {
    //     this.statusCounts[claim.status]++;
    //   } else {
    //     this.statusCounts[claim.status] = 1;
    //   }
    //   console.log(claim.status)
    // }

  
 

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'approved' ], [ 'Reviewed' ], 'Submitted' ];
  public pieChartDatasets = [ {
    data: [  this.countApprovedClaims() , this.countReviewedClaims(),this.countSubmittedClaims() ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];


}
