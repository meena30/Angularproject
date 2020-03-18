import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AuthGuard } from './auth/auth.guard';

// Datepicker module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {Role} from './models/role';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { HeaderComponent } from './header/header.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerService } from './shared/customer.service';
import { environment } from '../environments/environment';
import { ViewComponent } from './crud/view/view.component';
import { CreateComponent } from './crud/create/create.component';
import { EditComponent } from './crud/edit/edit.component';
import { OnepageComponent } from './onepage/onepage.component';
import { UsereditComponent } from './useredit/useredit.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AlertModule } from './alert/alert.module';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [

{ path: '', component: CustomerComponent, canActivate: [AuthGuard] },
{ path: 'reactive_form', component: ReactiveComponent, canActivate: [AuthGuard] },
{path: 'useredit/:id', component: UsereditComponent},
{path: 'view', component: ViewComponent},
{path: 'create', component: CreateComponent},
{path: 'edit/:id', component: EditComponent},
{path: 'login', component: LoginComponent},
{path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
{path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],data: { roles: [Role.Admin, Role.Superadmin] }}
];

@NgModule({
  declarations: [
    AppComponent,
    ReactiveComponent,
    HeaderComponent,
    CustomerComponent,
    CustomerListComponent,
    ViewComponent,
    CreateComponent,
    EditComponent,
    OnepageComponent,
    UsereditComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AlertModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ImageCropperModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
