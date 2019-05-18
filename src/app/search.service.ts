import { Injectable } from '@angular/core';
import { DataService } from './shared/services/data.service';
import { UserData } from './shared/models/userdata.model';
import { BehaviorSubject } from 'rxjs';
import { Broadcaster } from './shared/services/broadcaster.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public branchesData: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

  baseURL: String = '/app/getData';

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  get getBranchesData() {
    return this.branchesData.asObservable();
  }

  getBranchDetails() {
    this.broadcaster.broadcast('loader', true);
    const params = {};
    this.dataService.getRequest(this.baseURL, params).subscribe(data => {
      this.branchesData.next(data);
    });
  }

  getContactDetailsByBranchId() {

  }
}
