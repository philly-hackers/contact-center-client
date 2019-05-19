import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BranchesService } from 'src/app/shared/services/branches.service';
import { BranchAddUpdateResponse } from '../../../shared/models/branchData.model';

@Component({
  selector: 'create-branch-page',
  templateUrl: './create-branch-page.component.html',
  styleUrls: ['./create-branch-page.component.scss']
})
export class CreateBranchPageComponent {

  public branchName: string;
  public branchAddress: string;

  constructor(private router: Router, private branchService: BranchesService) {}

  public onCreateBranch() {
    console.log('onCreateBranch', this.branchName, this.branchAddress);
    const params = {
      'name': this.branchName,
      'address': this.branchAddress,
      'geolocation': '34.0603291,-84.2700786',
      'isactive': null
    };
    this.branchService.addNewBranch(params);
    this.branchService.addBranchResponse.subscribe((data: BranchAddUpdateResponse) => {
      if (data && data.name === this.branchName) {
        this.router.navigateByUrl('/branches');
      }
    });
  }
}
