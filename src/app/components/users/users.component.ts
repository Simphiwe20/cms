import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent{

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(){
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterChange(event: Event){
    const value = (event.target as HTMLElement).ariaValueMax;
    this.dataSource.filter = value?.trim().toLocaleLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }


  addMethods: string[] = ['Through Spreadsheet', 'Through Form'];
  showDropdown: boolean = false;
  selectedMethod: string | null = null;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onMethodSelected(event: any) {
    const selectedValue = event.target.value;
    // this.showDropdown = false;
    // Automatically trigger file upload input when "Through Spreadsheet" is selected
    if (selectedValue === 'Through Spreadsheet') {
      this.selectedMethod = selectedValue;
      this.triggerFileUpload();
    } else {
      // Hide the file upload input if another option is selected
      this.selectedMethod = null;
    }
  }

  triggerFileUpload() {
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.click(); // Programmatically click the file upload input
    }
  }

  openFormPopup() {
    // Code to open your form popup
    // You can implement this using Angular Material Dialog or any other method
    console.log('Opening form popup...');

    // Close the dropdown after selecting an option
    this.showDropdown = false;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  convertedJson!: string;
  displayedColumn: string[] = ['Emp_ID', 'Emp_Name', 'Emp_Surname', 'Emp_DOB', 'Emp_Gender', 'Emp_Email', 'Actions'];

  dataSource: any;
  fileUpload(event: any) {
    console.log(event.target.files);
    // Assinging the event/selected file to a variable
    const selectedFile = event.target.files[0];
    // An object to read the file
    const fileReader = new FileReader();
    // Using the method readAsBinaryString to read the file by passing it
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      console.log(event);
      // taking the binary data from the file reader bc thats the method we used.
      let binaryData = event.target?.result;
      // Read the binary data after npm install and import of xlsx
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      // Loop through Workbook.sheet names
      workbook.SheetNames.forEach(sheet => {
        // Using the XLSX method to convert sheet to JSON, and we are passing our sheetts which are in our workbook
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.table(data);

        // Stringyfy the data
        this.convertedJson = JSON.stringify(data, undefined, 4);
        localStorage.setItem('users', JSON.stringify(data))
        this.dataSource = data;
      })
      console.log(workbook);
    }

  }
}