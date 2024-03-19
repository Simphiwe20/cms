import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApisServicesService } from 'src/app/services/apis-services.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent {

  currentUser: any;
  deathClaims: any;
  tableData: any[] = []
  clients: any;

  displayedColumns: string[] = ['firstName', 'lastName', 'memberID', 'claimName', 'status', 'document'];
  dataSource: MatTableDataSource<[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private shared: SharedServicesService, private api: ApisServicesService) {

    this.api.genericGet('/get-death-claims')
      .subscribe({
        next: (_res) => {
          this.api.genericGet('/get-clients')
            .subscribe({
              next: (res) => {
                this.deathClaims = _res
                this.clients = res
                this.deathClaims.forEach((claim: any, indx: Number) => {
                  this.clients.forEach((client: any, _indx: number) => {
                    console.log(claim, client)
                    if (claim.memberID == client.memberID) {
                      console.log('Got it')
                      this.tableData.push(
                        {
                          ...client,
                          claimName: 'Death Claim'
                        }
                        )
                    }
                  })
                // this.dataSource =  new MatTableDataSource(this.tableData)
                console.log(this.tableData)
                })
                console.log(res)
                this.deathClaims = res
                this.dataSource = new MatTableDataSource(this.tableData)
              },
              error: (err) => { console.log(err) },
              complete: () => { }
            })
        },
        error: () => { },
        complete: () => { }
      })

    this.api.genericGet('/get-all-files')
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: () => { },
        complete: () => { }
      })

    this.currentUser = this.shared.getUser('currentUser', 'session')

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
