import { Component } from "@angular/core";
import { Broadcaster } from "../../../shared/services/broadcaster.service";
import { SearchService } from "../../../search.service";
import {
  Branch,
  Product,
  Contact
} from "../../../shared/models/userdata.model";
import { of } from "rxjs";

@Component({
  selector: "search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"]
})
export class SearchPageComponent {
  public branches: Branch[] = [];
  public selectedBranchId = null;
  private selectedBranch = null;

  public products: Product[] = [];
  public selectedProductId = "All";

  private contacts: Contact[] = [];
  public displayedContacts = [];

  public loading = false;

  constructor(
    private broadcaster: Broadcaster,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.searchService.getBranchDetails();

    this.searchService.getBranchesData.subscribe(data => {
      this.branches = data;
    });

    this.searchService.getContactsData.subscribe(contacts => {
      let newProductListObject = {};

      contacts.forEach(contact => {
        contact.products.forEach(v => {
          newProductListObject[v.id] = v;
        });
      });

      this.products = Object.values(newProductListObject);

      this.contacts = contacts;
      this.onProductSelect("All");

      this.loading = false;
    });
  }

  resetFields() {
    this.selectedProductId = "All";
    this.contacts = [];
    this.displayedContacts = [];
    this.products = [];
  }

  onBranchSelect(branchId) {
    console.log("selected branch", branchId);

    let newBranch = this.branches.find(branch => branch.id == branchId) || null;

    if (
      newBranch &&
      (this.selectedBranch === null || this.selectedBranch.id !== newBranch)
    ) {
      this.selectedBranchId = branchId;
      this.selectedBranch = newBranch;
      this.resetFields();

      // Fetch updated contacts
      this.loading = true;
      this.searchService.getContactDetails(this.selectedBranchId);
    }
  }

  onProductSelect(productId) {
    console.log("selected product", productId, this.products);

    let newProduct =
      this.products.find(products => products.id == productId) || null;

    if (productId === "All") {
      this.displayedContacts = this.contacts;
    } else if (newProduct) {
      this.displayedContacts = this.contacts.filter(contact => {
        return contact.products.find(product => {
          return product.id === productId;
        });
      });
    } else {
      this.displayedContacts = [];
    }
  }

  public getTarget(id, prependHash) {
    return prependHash ? "#" + 'ContactItem' + id : 'ContactItem' + id;
  }
}
