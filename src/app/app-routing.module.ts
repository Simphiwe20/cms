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
import { IdRegisterComponent } from './components/forms/id-register/id-register.component';
import { FeedbackComponent } from './components/shared/feedback/feedback.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, },
  {
    path: 'home', component: HomeComponent, canActivate: [ AuthGuard ], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'claims', component: ClaimsComponent },
      { path: 'add-claim', component: AddClaimsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent },
    ]
  },
  {path:'Registration-Identifier',component:IdRegisterComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogInComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
