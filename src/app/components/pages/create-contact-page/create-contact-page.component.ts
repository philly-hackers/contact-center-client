import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, Branch } from 'src/app/shared/models/userdata.model';
import { ContactService } from 'src/app/shared/services/contact.service';
import { BranchesService } from 'src/app/shared/services/branches.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'create-contact-page',
  templateUrl: './create-contact-page.component.html',
  styleUrls: ['./create-contact-page.component.scss']
})
export class CreateContactPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  public branchName = 'Atlanta';
  private branchId: string;
  branches: Branch[] = [];
  availableProducts: Product[] = [];

  products: Product[];
  userSelectedProducts: Product[] = [];

  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public emailAddress: string;
  public contactType: string;

  // Array of ids of products selected
  public selectedProducts: string[];

  constructor(private router: Router, private route: ActivatedRoute, private productServices: ProductService,
              private contactService: ContactService, private branchesService: BranchesService) {}

  getBranchRoute() {
    return this.branchId ? '/branches/' +  this.branchId : '/branches';
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.branchId = JSON.stringify(params.get('branchId')).replace(/\"/g, '');

        this.branchesService.getBranchDataById(this.branchId);

        this.subscriptions.push(
          this.branchesService.getBranchData.subscribe(branch => {
              let isExist = false;
              this.branches.forEach(item => {
                isExist = (item.name === branch.name) ? true : false;
              });
              if (!isExist) {
                this.branches.push(branch);
                this.branchName = branch.name;
              }
          })
        );

        this.productServices.getProductsByBranchId(this.branchId);
        this.subscriptions.push(
          this.productServices.getProductsDataByBranch.subscribe(products => {
            if (products) {
              this.availableProducts = products;
            }
          })
        );
      })
    );
  }

  addThisProduct(selectedProduct) {
    this.userSelectedProducts.push(selectedProduct);
  }

  public onCreateContact() {
    console.log('onCreateContact', this.firstName, this.lastName, this.contactType,
    this.branchName, this.emailAddress, this.emailAddress, this.userSelectedProducts);

    const params = {
      'name': this.firstName,
      'email': this.emailAddress,
      'phone': this.phoneNumber,
      'type': this.contactType,
      'branches': this.branches,
      'products': this.userSelectedProducts,
      'isactive': true
    };

    this.contactService.addNewContact(params);

    this.subscriptions.push(
      this.contactService.addContactResponse.subscribe(contact => {
        if (contact && contact.name === this.firstName) {
          this.router.navigateByUrl('/branches/' + this.branchId || '');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
