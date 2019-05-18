import { Injectable } from '@angular/core';
import { DataService } from './shared/services/data.service';
import { Contact, Branch, Product } from './shared/models/userdata.model';
import { BehaviorSubject } from 'rxjs';
import { Broadcaster } from './shared/services/broadcaster.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public branchesData: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>([]);
  public productData: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);

  baseBranchURL = 'http://chubbcontactcenterapi.azurewebsites.net/api/branch/';
  baseContactURL = 'http://chubbcontactcenterapi.azurewebsites.net/api/contact/';

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  get getBranchesData() {
    return this.branchesData.asObservable();
  }

  get getProductsData() {
    return this.branchesData.asObservable();
  }

  getBranchDetails() {
    this.broadcaster.broadcast('loader', true);
    this.dataService.getRequest(this.baseBranchURL, '').subscribe((data) => {
      this.branchesData.next(data);
    });
  }

  getContactDetailsByBranchId(params) {
    this.broadcaster.broadcast('loader', true);
    this.dataService.getRequest(this.baseContactURL, params).subscribe(data => {
        this.productData.next(data);
      }, error => {
        console.log('Server Error');
      });
  }

  getContactDetailsByBranchName(params) {
    this.broadcaster.broadcast('loader', true);
    this.dataService.getRequest(this.baseContactURL, params).subscribe(data => {
      this.productData.next(data);
    });
  }
}
