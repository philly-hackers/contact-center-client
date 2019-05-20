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
export class CreateProductPageComponent implements OnInit {
  
  public productName: string;
  public productBranches: string[];
  public availableBranches: Branch[];
  
  constructor(private router: Router, private searchService: SearchService) {}
  
  ngOnInit() {
    this.searchService.getBranchDetails();
    this.searchService.getBranchesData.subscribe(data => {
      this.availableBranches = data;
    });
  }

  public onCreateProduct() {
    console.log('onCreateProduct', this.productName);
    const params = {
      'name': this.productName,
      'category': 'Small Commercial',
      'branches': this.productBranches,
      'isactive': 'true'
    };
    this.router.navigateByUrl('/branches');
  }

  ngOnDestroy() {

  }
}
