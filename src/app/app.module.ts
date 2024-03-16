import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { UsersComponent } from './components/users/users.component';
import { ChangePwdComponent } from './components/popUps/change-pwd/change-pwd.component';
import { ToolBarComponent } from './components/shared/tool-bar/tool-bar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterAgentComponent } from './components/popUps/register-agent/register-agent.component';
import { LogInComponent } from './components/forms/log-in/log-in.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IdRegisterComponent } from './components/forms/id-register/id-register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MaterialModule } from './modules/materials/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeathClaimComponent } from './components/forms/claims/death-claim/death-claim.component';
import { PublicLiaClaimComponent } from './components/forms/claims/public-lia-claim/public-lia-claim.component';
import { PropLossClaimComponent } from './components/forms/claims/prop-loss-claim/prop-loss-claim.component';
import { AddClaimsComponent } from './components/add-claims/add-claims.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LogInComponent,
    RegisterComponent,
    DashboardComponent,
    ClaimsComponent,
    UsersComponent,
    ChangePwdComponent,
    ToolBarComponent,
    FooterComponent,
    ProfileComponent,
    RegisterAgentComponent,
    AddClaimsComponent,
    IdRegisterComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    DeathClaimComponent,
    PublicLiaClaimComponent,
    PropLossClaimComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
