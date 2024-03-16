import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-claims',
  templateUrl: './add-claims.component.html',
  styleUrls: ['./add-claims.component.scss']
})
export class AddClaimsComponent {

  dataSource!: MatTableDataSource<[]>;
  displayedColumns: string[] = ['Patient_name', 'doctorName','start_date', 'start_time', 'end_time', 'status']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  clients: any;
  claims:any[] = ['Death claim', 'Property Loss Claim', 'Public Liability']

  claimSelected: any;

  isAdded: boolean = false
  claimForm!: FormGroup
  lossDetails: FormGroup = new FormGroup({
      dateTime: new FormControl('', [Validators.required]),
      discoveryTime: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      lossState: new FormControl('', [Validators.required]),
      premises: new FormControl('', [Validators.required]),
      byWhom: new FormControl('', [Validators.required]),
      lastOccuppied: new FormControl('', [Validators.required]),
      forceEntry: new FormControl('', [Validators.required]),
      forcedDetails: new FormControl('', [Validators.required]),
      evidence: new FormControl('', [Validators.required]),
      alarmActivation: new FormControl('', [Validators.required]),
      alarmCompany: new FormControl('', [Validators.required]),
      
    }) 

  item: FormGroup = new FormGroup({
    itemNum: new FormControl('', Validators.required),
    make: new FormControl('', Validators.required),
    serial_number: new FormControl('', Validators.required),
    purchaseLocation: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required)
  })

  constructor() {
     this.claimForm = new FormGroup({
    lossDetails: this.lossDetails,
    items: new FormArray([])
  })

  
  this.clients = localStorage.getItem('clients')
  this.clients = this.clients ? JSON.parse(this.clients) : []

  this.dataSource = this.clients

  console.log(this.clients)
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
