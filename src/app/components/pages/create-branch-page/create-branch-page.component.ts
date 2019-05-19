import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'create-branch-page',
  templateUrl: './create-branch-page.component.html',
  styleUrls: ['./create-branch-page.component.scss']
})
export class CreateBranchPageComponent {

  public branchName: string;
  public branchAddress: string;

  constructor(private router: Router) {}
  
  public onCreateBranch() {
    console.log('onCreateBranch', this.branchName, this.branchAddress);
    this.router.navigateByUrl('/branches');
  }
}
