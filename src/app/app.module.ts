import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {
  LoginPageComponent, ContactsPageComponent, BranchesPageComponent, ProductsPageComponent,
  CreateContactPageComponent, CreateBranchPageComponent, CreateProductPageComponent,
  BranchesDetailsPageComponent, ProductsDetailsPageComponent, ContactsDetailsPageComponent,
  FooterComponent, SearchPageComponent } from './components';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BranchesComponent } from './branches/branches.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';

import { Broadcaster } from './shared/services/broadcaster.service'
import { DataService } from './shared/services/data.service';
import { SearchService } from './search.service';
import { ContextService } from './shared/services/context.service';
import { ContactService } from './shared/services/contact.service';
import { ProductService } from './shared/services/product.service';
import { BranchesService } from './shared/services/branches.service';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'contacts', component: ContactsPageComponent },
  { path: 'contacts/:contactId', component: ContactsDetailsPageComponent },
  { path: 'branches', component: BranchesPageComponent },
  { path: 'branches/:branchId', component: BranchesDetailsPageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'products/:productId', component: ProductsDetailsPageComponent },
  { path: 'create-contact', component: CreateContactPageComponent },
  { path: 'create-branch', component: CreateBranchPageComponent },
  { path: 'create-product', component: CreateProductPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

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
    SearchPageComponent,
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
    SharedModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Broadcaster,
    DataService,
    SearchService,
    BranchesService,
    ContactService,
    ProductService,
    ContextService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
