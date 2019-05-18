import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';

import { Broadcaster } from './shared/services/broadcaster.service'
import { DataService } from './shared/services/data.service';
import { BranchesComponent } from './branches/branches.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';

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
    HttpClientModule,
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    Broadcaster,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
