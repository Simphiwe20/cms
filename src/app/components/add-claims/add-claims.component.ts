import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApisServicesService } from 'src/app/services/apis-services.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-add-claims',
  templateUrl: './add-claims.component.html',
  styleUrls: ['./add-claims.component.scss']
})
export class AddClaimsComponent {

  currentUser: any;

  dataSource!: MatTableDataSource<[]>;
  displayedColumns: string[] = ['firstName', 'lastName', 'idNumber', 'policyNumber', 'claim']

  clients: any;
  claims: any[] = ['Death claim', 'Property Loss Claim', 'Public Liability']
  claimer: any;


  claimSelected: any;
  claim: boolean = false;
  eligibility!: boolean;

  isAdded: boolean = false


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private shared: SharedServicesService, private api: ApisServicesService) {

    this.currentUser = this.shared.getUser('currentUser', 'session')

    this.api.genericGet('/get-clients')
      .subscribe({
        next: (res) => {
          this.clients = res
          this.dataSource = new MatTableDataSource(this.clients)
        },
        error: (err) => { console.log(err) },
        complete: () => { }
      })

    this.dataSource = this.clients

    console.log(this.clients)

    if (this.currentUser.role === 'claimer') {
      this.claim = true
      this.eligibility = this.shared.monthDiff(this.currentUser.startDate, new Date()) > 3
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  apply(claimer: any) {
    console.log(claimer)
    this.claimer = claimer
    this.eligibility = this.shared.monthDiff(new Date(claimer.startDate), new Date()) > 3
    this.claim = true
  }

}
