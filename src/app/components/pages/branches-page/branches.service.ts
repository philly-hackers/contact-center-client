import { Injectable } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Broadcaster } from '../../../shared/services/broadcaster.service';
import { Branch, AddBranchResponse } from '../../../shared/models/userdata.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  branchPostURL = 'https://chubbcontactcenterapi.azurewebsites.net/api/branch';
  public addBranchResponse: BehaviorSubject<AddBranchResponse> = new BehaviorSubject<AddBranchResponse>( null );

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  get addBranchData() {
    return this.addBranchResponse.asObservable();
  }

  addNewBranch(params) {
    this.dataService.postRequest(this.branchPostURL, params).subscribe(
      (data: AddBranchResponse) => {
        this.addBranchResponse.next(data);
    });
  }
}
