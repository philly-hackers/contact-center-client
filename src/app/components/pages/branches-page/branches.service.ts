import { Injectable } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Broadcaster } from '../../../shared/services/broadcaster.service';
import { Branch, BranchAddUpdateResponse } from '../../../shared/models/userdata.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  branchPostURL = 'https://chubbcontactcenterapi.azurewebsites.net/api/branch';
  public addBranchResponse: BehaviorSubject<BranchAddUpdateResponse> = new BehaviorSubject<BranchAddUpdateResponse>( null );

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  get addBranchData() {
    return this.addBranchResponse.asObservable();
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
