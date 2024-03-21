import { AfterViewInit, Input, Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements AfterViewInit {

  // status:any = this.claims.status


  approve: number = 0;
  deathClaims: any;

  _claims: any;
  // claimData = this._claims ? JSON.parse(this._claims) : []
  approvedClaimsCount: number = 0;
  reviewedClaimsCount: number = 0;
  rejectedClaimsCount: number = 0
  submittedClaimsCount: number = 0
  constructor(private api: ApisServicesService) {

    this.api.genericGet('/get-death-claims')
      .subscribe({
        next: (res) => {
          this.deathClaims = res
          this._claims = res
          console.log(res)
          this.countApprovedClaims()
          this.countSubmittedClaims()
          this.countRejectedClaims()
          this.countReviewedClaims()
        },
        error: (err) => { console.log(err) },
        complete: () => { }
      })
  }


  

  countApprovedClaims(): any {
    console.log(this._claims)
    return this.approvedClaimsCount = this._claims.filter((claim: any) => claim.status === "Approved").length ? this._claims.filter((claim: any) => claim.status === "Approved").length : 0;
  }
  countReviewedClaims(): any {
    console.log(this.approvedClaimsCount)
    return this.submittedClaimsCount = this._claims.filter((claim: any) => claim.status === "Reviewed").length ? this._claims.filter((claim: any) => claim.status === "Reviewed").length : 0;
  }

  countRejectedClaims(): any {
    return this.rejectedClaimsCount = this._claims.filter((claim: any) => claim.status === "Rejected").length ? this._claims.filter((claim: any) => claim.status === "Rejected").length : 0;
  }

  countSubmittedClaims(): any {
    return this.submittedClaimsCount =  this._claims.filter((claim: any) => claim.status === "Submitted").length ? this._claims.filter((claim: any) => claim.status === "Submitted").length : 0;
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

  // deathClaims: any[] = [];

  ngAfterViewInit(): void {
    console.log(this._claims)
    // this.countApprovedClaims();
    // this.countReviewedClaims();
    // this.countSubmittedClaims()
  }
  public pieChartLabels = [['Approved'], ['Reviewed'], ['Rejected'], 'Submitted'];
  public pieChartDatasets = [{
    data: [this.approvedClaimsCount, this.reviewedClaimsCount, this.rejectedClaimsCount, this.submittedClaimsCount]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

}
