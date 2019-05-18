import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'branches-details-page',
  templateUrl: './branches-details-page.component.html',
  styleUrls: ['./branches-details-page.component.scss']
})
export class BranchesDetailsPageComponent implements OnInit {
  public branchId: string;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.branchId = params.get('branchId');
      }
    );
  }
}
