import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from 'src/app/shared/models/userdata.model';

@Component({
  selector: 'branches-page',
  templateUrl: './branches-page.component.html',
  styleUrls: ['./branches-page.component.scss']
})
export class BranchesPageComponent implements OnInit {
  
  public branches: Branch[] = [];
  
  constructor(private router: Router) {}
  
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
}
