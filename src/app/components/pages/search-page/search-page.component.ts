import { Component, OnInit, OnDestroy } from "@angular/core";
import { Broadcaster } from "../../../shared/services/broadcaster.service";
import { SearchService } from "../../../search.service";
import {
  Branch,
  Product,
  Contact
} from "../../../shared/models/userdata.model";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"]
})
export class SearchPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  public isDirty = false;

  public branches: Branch[];
  public displayedBranches: Branch[];
  public sortByDistance = false;

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

      if (this.sortByDistance) {
        this.sortBranchesByDistance();
      } else {
        this.displayedBranches = this.branches;
      }
    });

    this.searchService.getContactsData.subscribe(contacts => {
      const newProductListObject = {};

      contacts.forEach(contact => {
        contact.products.forEach(product => {
          newProductListObject[product.id] = product;
        });
      });

      this.products = Object.values(newProductListObject);
      this.contacts = contacts;
      this.onProductSelect("All");
      this.loading = false;
    });
  }

  toggleSort() {
    this.sortByDistance = !this.sortByDistance;

    if(this.branches) {
      if (this.sortByDistance) {
        this.sortBranchesByDistance();
      } else {
        this.displayedBranches = this.branches;
      }
    }
  }

  sortBranchesByDistance() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const y = position.coords.latitude;
        const x = position.coords.longitude;

        this.branches.forEach(branch => {
          const branchY = +branch.geolocation.split(',')[0];
          const branchX = +branch.geolocation.split(',')[1];
          const distance = this.distance(y, x, branchY, branchX);
          branch['distance'] = distance;
        });

        this.displayedBranches = this.branches.slice().sort((a, b) => {
          return a['distance'] - b['distance'];
        });
      });
    } else {
      this.sortByDistance = false;
      this.displayedBranches = this.branches;
    }
  }

  distance(lat1, lon1, lat2, lon2) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
  }

  resetFields() {
    this.selectedProductId = "All";
    this.contacts = [];
    this.displayedContacts = [];
    this.products = [];
  }

  onBranchSelect(branchId: string) {
    this.isDirty = true;
    console.log("selected branch", branchId);

    const newBranch =
      this.branches.find(branch => branch.id === branchId) || null;

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

  onProductSelect(productId: string) {
    console.log("selected product", productId, this.products);
    const newProduct =
      this.products.find(products => products.id === productId) || null;

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
    return prependHash ? "#" + "ContactItem" + id : "ContactItem" + id;
  }

  ngOnDestroy() {}
}
