import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BranchesComponent } from './branches/branches.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';

import { Broadcaster } from './shared/services/broadcaster.service'
import { DataService } from './shared/services/data.service';

const appRoutes: Routes = [
  { path: 'branches', component: BranchesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/branches', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    BranchesComponent,
    ContactsComponent,
    ProductsComponent,
    SearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    SharedModule
  ],
  providers: [
    Broadcaster,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
