
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Broadcaster } from '../../../shared/services/broadcaster.service';
import { BranchesService } from '../../../shared/services/branches.service';
import { BranchAddUpdateResponse } from '../../../shared/models/userdata.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Branch } from 'src/app/shared/models/userdata.model';

@Component({
  selector: 'branches-page',
  templateUrl: './branches-page.component.html',
  styleUrls: ['./branches-page.component.scss']
})
export class BranchesPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  public branches: Branch[] = [];

  constructor( private branchService: BranchesService, 
    private broadcaster: Broadcaster, private router: Router) { }

  ngOnInit(): void {
    /* Replace with get all branches */
    this.branches = [
      {
        id: '1',
        name: 'branch1',
        address: 'addr1',
        geolocation: 'x y'
      },
      {
        id: '2',
        name: 'branch2',
        address: 'addr2',
        geolocation: 'x y'
      },
      {
        id: '3',
        name: 'branch3',
        address: 'addr3',
        geolocation: 'x y'
      }
    ]
  }

  public navigateToBranchDetailsPage(branchId) {
    this.router.navigateByUrl('/branches/' + branchId);
  }

  public navigateToCreateBranch() {
    this.router.navigateByUrl('/create-branch');
  }

  addBranch(params) {
    const tempParams = {
      'name': 'Atlanta',
      'address': '11575 Great Oaks Way \nSuite 200\nAlpharetta, GA 30022 \nT 678-795-4000',
      'geolocation': '34.0603291,-84.2700786',
      'isactive': null
    };
    params = params ? params : tempParams;
    this.branchService.addNewBranch(params);

    this.subscriptions.push(
      this.branchService.addBranchData.subscribe( (data: BranchAddUpdateResponse) => {
        console.log('Add Branch Data ' + data.name, data.id);
      })
    );
  }

  updateBranch(params) {
    const tempParams = {
      'id': '2ecf8db1-53a6-4155-a1db-a7a6cfe66897',
      'name': 'Atlanta',
      'address': '11575 Great Oaks Way \nSuite 200\nAlpharetta, GA 30022 \nT 678-795-4000',
      'geolocation': '34.0603291,-84.2700786',
      'isactive': null
    };
    params = params ? params : tempParams;
    this.branchService.updateBranch(params);
    this.subscriptions.push(
      this.branchService.addBranchData.subscribe( (data: BranchAddUpdateResponse) => {
        console.log('Add Branch Data ' + data.name, data.id);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
