import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: '',
    component: LoginPageComponent
  },
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
  }
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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
