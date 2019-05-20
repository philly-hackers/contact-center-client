import { Injectable } from "@angular/core";
import { DataService } from "./shared/services/data.service";
import { Contact, Branch, Product } from "./shared/models/userdata.model";
import { BehaviorSubject } from "rxjs";
import { Broadcaster } from "./shared/services/broadcaster.service";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  public branchesData: BehaviorSubject<Branch[]> = new BehaviorSubject<
    Branch[]
  >([]);
  public contactsData: BehaviorSubject<Contact[]> = new BehaviorSubject<
    Contact[]
  >([]);

  baseBranchURL = "https://chubbcontactcenterapi.azurewebsites.net/api/branch/";
  baseContactURL =
    "https://chubbcontactcenterapi.azurewebsites.net/api/contact/branch/id=";
  baseContactTermURL = "https://chubbcontactcenterapi.azurewebsites.net/api/search/query/q=";

  constructor(
    private dataService: DataService,
    private broadcaster: Broadcaster
  ) {}

  get getBranchesData() {
    return this.branchesData.asObservable();
  }

  get getContactsData() {
    return this.contactsData.asObservable();
  }

  getBranchDetails() {
    this.broadcaster.broadcast("loader", true);
    this.dataService.getRequest(this.baseBranchURL, "").subscribe(data => {
      this.branchesData.next(data);
    });
  }

  getContactDetails(params) {
    this.broadcaster.broadcast("loader", true);
    this.dataService.getRequest(this.baseContactURL, params).subscribe(
      data => {
        this.contactsData.next(data);
      },
      error => {
        console.log("Server Error");
      }
    );
  }

  getContactByTerm(term) {
    this.broadcaster.broadcast("loader", true);
    this.dataService.getRequest(this.baseContactTermURL, term).subscribe(
      data => {
        this.contactsData.next(data);
      },
      error => {
        console.log("Server Error");
      }
    );
  }
}
