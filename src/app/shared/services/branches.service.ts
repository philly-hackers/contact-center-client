import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Broadcaster } from './broadcaster.service';
import { Branch, BranchAddUpdateResponse } from '../models/userdata.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  branchPostURL = 'https://chubbcontactcenterapi.azurewebsites.net/api/branch/';
  baseContactURL = 'https://chubbcontactcenterapi.azurewebsites.net/api/contact/branch/id=';
  public addBranchResponse: BehaviorSubject<BranchAddUpdateResponse> = new BehaviorSubject<BranchAddUpdateResponse>( null );
  public branchData: BehaviorSubject<Branch> = new BehaviorSubject<Branch>(null);

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  get addBranchData() {
    return this.addBranchResponse.asObservable();
  }

  get getBranchData() {
    return this.branchData.asObservable();
  }

  getBranchDataById(params) {
    this.dataService.getRequest(this.branchPostURL, params).subscribe((data) => {
      this.branchData.next(data);
    });
  }

  addNewBranch(params: object) {
    this.dataService.postRequest(this.branchPostURL, params).subscribe((data: BranchAddUpdateResponse) => {
        this.addBranchResponse.next(data);
    });
  }

  updateBranch(params: object) {
    this.dataService.putRequest(this.branchPostURL, params).subscribe((data: BranchAddUpdateResponse) => {
        this.addBranchResponse.next(data);
    });
  }
}
