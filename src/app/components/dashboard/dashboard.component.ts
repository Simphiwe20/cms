import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  _claims = localStorage.getItem('claims');
  claimData = this. _claims ? JSON.parse(this._claims) : []
  approvedClaimsCount: number = 0;
  reviewedClaimsCount:number =0;
  submittedClaimsCount:number =0
 totalClaims:number=this.claimData.length
 constructor(){
  this.countApprovedClaims();
  this.countReviewedClaims();
  this.countSubmittedClaims()
  console.log( "long")
 
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
}
