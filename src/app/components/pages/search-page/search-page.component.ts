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

  public selectedBranchId = "All";
  private selectedBranch = null;

  public products: Product[] = [];
  public selectedProductId = "All";

  private contacts: Contact[] = [];
  public displayedContacts = [];

  public loading = false;

  public searchTerm: string;
  public displayedSearchTerm: string;
  public showConfig: boolean = false;

  public selectedSearchBranchId: string = null;
  public sortedBranches;

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
        this.sortedBranches = this.branches;
      }
    });

    this.searchService.getContactsData.subscribe(contacts => {
      const newProductListObject = {};
      const newBranchListObject = {};

      this.contacts = contacts.filter(contact => contact.name);

      this.contacts.forEach(contact => {
        contact.products.forEach(product => {
          newProductListObject[product.id] = product;
        });
        contact.branches.forEach(branch => {
          newBranchListObject[branch.id] = branch;
        });
      });

      this.products = Object.values(newProductListObject);
      this.displayedBranches = Object.values(newBranchListObject);

      this.resetConfig();
      this.filterContacts();

      this.loading = false;
    });
  }

  toggleSort() {
    this.sortByDistance = !this.sortByDistance;

    if (this.branches) {
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
          const branchY = +branch.geolocation.split(",")[0];
          const branchX = +branch.geolocation.split(",")[1];
          const distance = this.distance(y, x, branchY, branchX);
          branch["distance"] = distance;
        });

        this.sortedBranches = this.branches.slice().sort((a, b) => {
          return a["distance"] - b["distance"];
        });
      });
    } else {
      this.sortByDistance = false;
      this.sortedBranches = this.branches;
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
    this.contacts = [];
    this.displayedContacts = [];
    this.products = [];
    this.resetConfig();
  }

  resetSearchTerm() {
    this.searchTerm = null;
    this.displayedSearchTerm = null;
  }

  resetSearchBranch() {
    this.selectedSearchBranchId = null;
  }
  
  resetConfig() {
    this.selectedProductId = "All";
    this.selectedBranchId = "All";
  }

  searchByBranch() {
    this.isDirty = true;
    this.resetSearchTerm();
    this.resetFields();
    this.loading = true;
    this.searchService.getContactDetails(this.selectedSearchBranchId);
  }

  // onBranchSelect(branchId: string) {
  //   const newBranch =
  //     this.branches.find(branch => branch.id === branchId) || null;

  //   if (
  //     newBranch &&
  //     (this.selectedBranch === null || this.selectedBranch.id !== newBranch)
  //   ) {
  //     this.selectedBranchId = branchId;
  //     this.selectedBranch = newBranch;

  //     // Fetch updated contacts
  //     this.loading = true;
  //     this.searchService.getContactDetails(this.selectedBranchId);
  //   }
  // }

  // onProductSelect(productId: string) {
  //   console.log("selected product", productId, this.products);
  //   const newProduct =
  //     this.products.find(products => products.id === productId) || null;

  //   if (productId === "All") {
  //     this.displayedContacts = this.contacts;
  //   } else if (newProduct) {
  //     this.displayedContacts = this.contacts.filter(contact => {
  //       return contact.products.find(product => {
  //         return product.id === productId;
  //       });
  //     });
  //   } else {
  //     this.displayedContacts = [];
  //   }
  // }

  public getTarget(id, prependHash) {
    return prependHash ? "#" + "ContactItem" + id : "ContactItem" + id;
  }

  search() {
    this.isDirty = true;
    this.resetSearchBranch();

    if (this.searchTerm) {
      this.resetFields();
      this.loading = true;
      this.displayedSearchTerm = this.searchTerm;
      this.searchService.getContactByTerm(this.searchTerm);
    }
  }

  toggleConfig(event) {
    event.preventDefault();
    this.showConfig = !this.showConfig;
  }

  filterContacts() {
    this.displayedContacts = this.contacts.filter(contact => {
      return (
        (this.selectedBranchId === "All" ||
          contact.branches.find(
            branch => branch.id === this.selectedBranchId
          )) &&
        (this.selectedProductId === "All" ||
          contact.products.find(
            product => product.id === this.selectedProductId
          ))
      );
    });
  }

  getBranchName() {
    return this.sortedBranches.find(branch => branch.id === this.selectedSearchBranchId).name;
  }

  ngOnDestroy() {}
}
