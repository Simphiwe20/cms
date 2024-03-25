import { AfterViewInit, Component, Output } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})

export class BarComponent implements AfterViewInit{
  _claims: any;
  // claimData = this. _claims ? JSON.parse(this._claims) : []
  deathClaims: any;
  counts: any;
  deathClaimApproved: number = 0;
  deathClaimSubmitted: number = 0;
  deathClaimRejected: number = 0
  deathClaimReviewed: number = 0;
  propClaimApproved: number = 0;
  propClaimSubmitted: number = 0;
  propClaimRejected: number = 0
  propClaimReviewed: number = 0;
  publicClaimApproved: number = 0;
  publicClaimSubmitted: number = 0;
  publicClaimRejected: number = 0
  publicClaimReviewed: number = 0;
  loaded: boolean = false
  constructor(private api: ApisServicesService) {
    // this.countApprovedClaims();
    // this.countReviewedClaims();
    // this.countSubmittedClaims()

    this.getDeathCount()
    this.getPropCount()
    this.getPublic()

    console.log(this.propClaimReviewed)
  }

  
  getDeathCount() {
    this.api.genericGet('/get-death-claims')
    .subscribe({
      next: (res) => {
        this.deathClaims = res
        this.deathClaims = this.deathClaims ? this.deathClaims.length : 0;
        this.counts = res
        console.log(this.deathClaims)
        this.deathClaimApproved = this.counts.filter((claim: any) => claim.status == 'Approved').length
        this.deathClaimReviewed = this.counts.filter((claim: any) => claim.status == 'Reviewed').length
        this.deathClaimSubmitted = this.counts.filter((claim: any) => claim.status == 'Submitted').length
        this.deathClaimRejected = this.counts.filter((claim: any) => claim.status == 'Rejected').length

        this.barChartData.datasets[0]['data'].push(this.deathClaimApproved)
        this.barChartData.datasets[1]['data'].push(this.deathClaimReviewed)
        this.barChartData.datasets[2]['data'].push(this.deathClaimRejected)
        this.barChartData.datasets[3]['data'].push(this.deathClaimSubmitted)

        // this._claims = res
        // console.log(this.approvedClaimsCount)
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }

  getPropCount() {
    this.api.genericGet('/get-prop-claims')
      .subscribe({
        next: (res) => {
          this.deathClaims = res
          this._claims = res
          console.log(res)
          this.propClaimApproved += this._claims.filter((claim: any) => claim.status == 'Approved').length
          this.propClaimReviewed += this._claims.filter((claim: any) => claim.status == 'Reviewed').length
          this.propClaimSubmitted += this._claims.filter((claim: any) => claim.status == 'Submitted').length
          this.propClaimRejected += this._claims.filter((claim: any) => claim.status == 'Rejected').length
          console.log(this.propClaimReviewed)

            this.barChartData.datasets[0]['data'].push(this.propClaimApproved)
            this.barChartData.datasets[1]['data'].push(this.propClaimReviewed)
            this.barChartData.datasets[2]['data'].push(this.propClaimRejected)
            this.barChartData.datasets[3]['data'].push(this.propClaimSubmitted)

        },
        error: (err) => { console.log(err) },
        complete: () => { }

      })

  }

  getPublic() {
    this.api.genericGet('/get-public-claims')
      .subscribe({
        next: (res) => {
          this.deathClaims = res
          this._claims = res
          console.log(res)
          this.publicClaimApproved += this._claims.filter((claim: any) => claim.status == 'Approved').length
          this.publicClaimReviewed += this._claims.filter((claim: any) => claim.status == 'Reviewed').length
          this.publicClaimSubmitted += this._claims.filter((claim: any) => claim.status == 'Submitted').length
          this.publicClaimRejected += this._claims.filter((claim: any) => claim.status == 'Rejected').length
          this.barChartData.datasets[0]['data'].push(this.publicClaimApproved)
          this.barChartData.datasets[1]['data'].push(this.publicClaimReviewed)
          this.barChartData.datasets[2]['data'].push(this.publicClaimRejected)
          this.barChartData.datasets[3]['data'].push(this.publicClaimSubmitted)

          this.loaded = true
        },
        error: (err) => { console.log(err) },
        complete: () => { }
      })


  }

  ngAfterViewInit(): void {
    console.log(this.barChartData)
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [' Death Claim', 'Property Loss and Damage Claim', 'Public Liability Claim'],
    datasets: [
      { data: [], label: 'Approved' },
      { data: [], label: 'Reviewed' },
      { data: [], label: 'Rejected' },
      { data: [], label: 'Submitted' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

}
