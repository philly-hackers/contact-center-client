import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from '../../../shared/models/userdata.model';
import { SearchService } from 'src/app/search.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss']
})
export class CreateProductPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  public productName: string;
  productCategory: string;
  public productBranches: string[];
  public availableBranches: Branch[];
  selectedBranches: Branch[] = [];

  constructor(private router: Router, private searchService: SearchService, private productService: ProductService) {}

  ngOnInit() {
    this.searchService.getBranchDetails();
    this.subscriptions.push(
      this.searchService.getBranchesData.subscribe(data => {
        this.availableBranches = data;
      })
    );
  }

  addSelectedBranch(selectedBranch: Branch) {
    this.selectedBranches.push(selectedBranch);
  }

  public createProduct() {
    console.log('onCreateProduct', this.productName, this.productCategory);
    const params = {
      'name': this.productName,
      'category': this.productCategory,
      'branches': this.selectedBranches,
      'isactive': 'true'
    };

    this.productService.addNewProduct(params);
    this.subscriptions.push(
      this.productService.getNewAddedProduct.subscribe(product => {
        if (product && product.name === this.productName) {
          this.router.navigateByUrl('/branches');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    });

  }
}
