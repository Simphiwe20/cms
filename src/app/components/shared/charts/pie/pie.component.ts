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
  pieChartLabels: any;
  pieChartDatasets: any;

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
          this.approvedClaimsCount = this._claims.filter((claim:any) => claim.status == 'Approved').length
          this.reviewedClaimsCount = this._claims.filter((claim:any) => claim.status == 'Reviewed').length
          this.submittedClaimsCount = this._claims.filter((claim:any) => claim.status == 'Submitted').length
          this.rejectedClaimsCount = this._claims.filter((claim:any) => claim.status == 'Rejected').length
          this.pieChartLabels = [['Approved'], ['Reviewed'], ['Rejected'], 'Submitted'];
          this.pieChartDatasets = [{
            data: [this.approvedClaimsCount, this.reviewedClaimsCount, this.rejectedClaimsCount, this.submittedClaimsCount]
          }];
        },
        error: (err) => { console.log(err) },
        complete: () => { }
      })
      this.getPropCount()
      this.getPublicCount()
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



  getPropCount() {
    this.api.genericGet('/get-prop-claims')
    .subscribe({
      next: (res) => {
        this.deathClaims = res
        this._claims = res
        console.log(res)
        this.approvedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Approved').length
        this.reviewedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Reviewed').length
        this.submittedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Submitted').length
        this.rejectedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Rejected').length
        this.pieChartLabels = [['Approved'], ['Reviewed'], ['Rejected'], 'Submitted'];
        this.pieChartDatasets = [{
          data: [this.approvedClaimsCount, this.reviewedClaimsCount, this.rejectedClaimsCount, this.submittedClaimsCount]
        }];
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }

  getPublicCount() {
    this.api.genericGet('/get-public-claims')
    .subscribe({
      next: (res) => {
        this.deathClaims = res
        this._claims = res
        console.log(res)
        this.approvedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Approved').length
        this.reviewedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Reviewed').length
        this.submittedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Submitted').length
        this.rejectedClaimsCount += this._claims.filter((claim:any) => claim.status == 'Rejected').length
        this.pieChartLabels = [['Approved'], ['Reviewed'], ['Rejected'], 'Submitted'];
        this.pieChartDatasets = [{
          data: [this.approvedClaimsCount, this.reviewedClaimsCount, this.rejectedClaimsCount, this.submittedClaimsCount]
        }];
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }




  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  // deathClaims: any[] = [];

  ngAfterViewInit(): void {
    console.log(this._claims)

  }
  // public pieChartLabels = [['Approved'], ['Reviewed'], ['Rejected'], 'Submitted'];
  // public pieChartDatasets = [{
  //   data: [this.approvedClaimsCount, this.reviewedClaimsCount, this.rejectedClaimsCount, this.submittedClaimsCount]
  // }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

}
