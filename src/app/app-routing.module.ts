import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/modules/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CreateProfileComponent } from './components/pages/create-profile/create-profile.component';
import { CompanyHomeComponent } from './components/pages/company-home/company-home.component';
import { CompanyRegisterComponent } from './components/modules/company-register/company-register.component';
import { JoblistComponent } from './components/pages/joblist/joblist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'createprofile', component: CreateProfileComponent },
  { path: 'employers', component: CompanyHomeComponent },
  { path: 'registercompany', component: CompanyRegisterComponent },
  { path: 'joblist', component: JoblistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
