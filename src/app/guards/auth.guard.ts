import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedServicesService } from '../services/shared-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedInUser: any

  constructor(private shared: SharedServicesService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.loggedInUser = this.shared.getUser("currentUser", "session")

    console.log("Logged IN USER: ", this.loggedInUser)

    if(this.loggedInUser) {
      return true 
    }else {
      this.router.navigate(['/login'])
      return false
    }

  }
  
}
