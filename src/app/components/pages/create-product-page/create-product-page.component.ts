import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from '../../../shared/models/userdata.model';
import { BranchesService } from 'src/app/shared/services/branches.service';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss']
})
export class CreateProductPageComponent implements OnInit, OnDestroy {
  branches: Branch[] = [];
  selectedBranch: Branch[] = [];
  public productName: string;

  constructor(private router: Router, private branchService: BranchesService,
              private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.getBranchDetails();
    this.searchService.getBranchesData.subscribe( branches => {
      this.branches = branches;
    });
  }

  public onCreateProduct() {
    console.log('onCreateProduct', this.productName);
    const params = {
      'name': this.productName,
      'category': 'Small Commercial',
      'branches': this.branches,
      'isactive': 'true'
    };
    this.router.navigateByUrl('/branches');
  }

  ngOnDestroy() {

  }
}
