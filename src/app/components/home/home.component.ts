import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  menuItems: any;
  currentUser: any;

  constructor(private shared: SharedServicesService, private router: Router) {

    this.currentUser = shared.getUser('currentUser', 'session')

    if (this.currentUser.role === 'admin') {
      this.menuItems = [
        { item: 'Dashboard', route: '/home/dashboard' },
        { item: 'Users', route: '/home/users' },
        { item: 'Profile', route: '/home/profile' },
        { item: 'Log Out', route: '/login' }]
        this.router.navigate(['/home/dashboard'])
    } else if (this.currentUser.role === 'agent') {
      this.menuItems = [
        { item: 'Dashboard', route: '/home/dashboard' },
        { item: 'Claims', route: '/home/claims' },
        { item: 'Add Claims', route: '/home/add-claim' },
        { item: 'Profile', route: '/home/profile' },
        { item: 'Log Out', route: '/login' }]
        this.router.navigate(['/home/dashboard'])
    } else if (this.currentUser.role === 'claimer') {
      this.menuItems = [
        { item: 'Claims', route: '/home/claims' },
        { item: 'Add Claims', route: '/home/add-claim' },
        { item: 'Profile', route: '/home/profile' },
        { item: 'Log Out', route: '/login' }
      ]
    } else if (this.currentUser.role === 'manager') {
      this.menuItems = [
        { item: 'Dashboard', route: '/home/dashboard' },
        { item: 'Claims', route: '/home/claims' },
        { item: 'Profile', route: '/home/profile' },
        { item: 'Log Out', route: '/login' }]
        this.router.navigate(['/home/dashboard'])
    }
  }
}
