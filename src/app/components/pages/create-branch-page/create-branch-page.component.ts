import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'create-branch-page',
  templateUrl: './create-branch-page.component.html',
  styleUrls: ['./create-branch-page.component.scss']
})
export class CreateBranchPageComponent {

  constructor(private router: Router) {}
  
  public onCreateBranch() {
    this.router.navigateByUrl('/branches');
  }
}
