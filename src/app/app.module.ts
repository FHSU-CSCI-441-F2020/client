import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { HttpLinkModule } from 'apollo-angular-link-http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { EmployerService } from './services/employer.service';
import { JobsService } from './services/jobs.service';
import { NavbarComponent } from './components/modules/navbar/navbar.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './components/modules/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoadingComponent } from './components/modules/loading/loading.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CreateProfileComponent } from './components/pages/create-profile/create-profile.component';
import { JoblistComponent } from './components/pages/joblist/joblist.component';
import { CompanyHomeComponent } from './components/pages/company-home/company-home.component';
import { CompanyRegisterComponent } from './components/modules/company-register/company-register.component';
import { JobCreateComponent } from './components/modules/job-create/job-create.component';
import { JobDetailsComponent } from './components/modules/job-details/job-details.component';
import { CandidateProfileComponent } from './components/pages/candidate-profile/candidate-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    ProfileComponent,
    CreateProfileComponent,
    JoblistComponent,
    CompanyHomeComponent,
    CompanyRegisterComponent,
    JobCreateComponent,
    JobDetailsComponent,
    CandidateProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    HttpLinkModule,
  ],
  providers: [AuthService, UserService, EmployerService, JobsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
