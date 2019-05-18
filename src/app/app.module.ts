import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {
  LoginPageComponent,
  ContactsPageComponent,
  BranchesPageComponent,
  ProductsPageComponent,
  CreateContactPageComponent,
  CreateBranchPageComponent,
  CreateProductPageComponent,
  BranchesDetailsPageComponent,
  ProductsDetailsPageComponent,
  ContactsDetailsPageComponent,
  FooterComponent
} from './components';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'contacts',
    component: ContactsPageComponent
  },
  {
    path: 'contacts/:contactId',
    component: ContactsDetailsPageComponent
  },
  {
    path: 'branches',
    component: BranchesPageComponent
  },
  {
    path: 'branches/:branchId',
    component: BranchesDetailsPageComponent
  },
  {
    path: 'products',
    component: ProductsPageComponent
  },
  {
    path: 'products/:productId',
    component: ProductsDetailsPageComponent
  },
  {
    path: 'create-contact',
    component: CreateContactPageComponent
  },
  {
    path: 'create-branch',
    component: CreateBranchPageComponent
  },
  {
    path: 'create-product',
    component: CreateProductPageComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full' 
  }
];


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BranchesComponent } from './branches/branches.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';

import { Broadcaster } from './shared/services/broadcaster.service'
import { DataService } from './shared/services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ContactsPageComponent,
    BranchesPageComponent,
    ProductsPageComponent,
    CreateContactPageComponent,
    CreateBranchPageComponent,
    CreateProductPageComponent,
    BranchesDetailsPageComponent,
    ProductsDetailsPageComponent,
    ContactsDetailsPageComponent,
    FooterComponent,
    BranchesComponent,
    ContactsComponent,
    ProductsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    Broadcaster,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
