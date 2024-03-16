import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnChanges{

  currentUser: any;

  @Input() menuItems: any;

  constructor(private shared: SharedServicesService) {
    this.currentUser = this.shared.getUser('currentUser', 'session')
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this.menuItems)
    this.menuItems = this.menuItems
  }

}
