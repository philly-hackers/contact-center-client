import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Broadcaster } from '../shared/services/broadcaster.service';
import { Branch } from '../shared/models/userdata.model';
import { BehaviorSubject } from 'rxjs';
import { BranchesComponent } from './branches.component';

@Injectable({
  providedIn: 'root'
})
export class BrachesService {

  branchPostURL = 'http://chubbcontactcenterapi.azurewebsites.net/api/Branch';
  public createdBranch: BehaviorSubject<Branch> = new BehaviorSubject<Branch>( null );

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  addNewBranch(params) {
    // this.broadcaster.broadcast('loader', true);
    this.dataService.postRequest(this.branchPostURL, params).subscribe(
      (data) => {
        this.createdBranch.next(data);
    });
  }
}
