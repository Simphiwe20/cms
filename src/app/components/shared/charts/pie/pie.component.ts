import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ApisServicesService } from 'src/app/services/apis-services.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements AfterViewInit{

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  deathClaims: any[] = [];

  constructor(private api: ApisServicesService){

    this.api.genericGet('/get-death-claims')
      .subscribe({
        next: (res) => {
          this.deathClaims = [res]
          console.log(res)
        },
        error: () => { },
        complete: () => { }
      })
    

    // this.pieChartDatasets[0].data.push(this.deathClaims.length)
  }

  ngAfterViewInit(): void {
    console.log(this.deathClaims)
  }

  public pieChartLabels = [['Approved claims'], ['Rejected claims'], ['Reviewed Claims'], ['Submitted Claims']];
  public pieChartDatasets = [{
    data: []
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  


}
