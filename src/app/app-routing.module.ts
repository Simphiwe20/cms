import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { LogInComponent } from './components/forms/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { AddClaimsComponent } from './components/add-claims/add-claims.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'claims', component: ClaimsComponent },
      { path: 'add-claim', component: AddClaimsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogInComponent },
  { path: '**', component: PageNotFoundComponent }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
