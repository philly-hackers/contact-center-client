import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact, Branch } from "src/app/shared/models/userdata.model";

@Component({
  selector: "branches-details-page",
  templateUrl: "./branches-details-page.component.html",
  styleUrls: ["./branches-details-page.component.scss"]
})
export class BranchesDetailsPageComponent implements OnInit {
  public branchId: string;
  public branch: Branch;
  public contacts: Contact[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.branchId = params.get("branchId");

      /* Replace with get branch details */
      this.branch = {
        id: "1",
        name: "branch1",
        address: "addr1",
        geolocation: "x y"
      };

      /* Replace with call to get contacts for this branch */
      this.contacts = [
        {
          id: "1",
          name: "contact1",
          email: "email1",
          phone: "phone1",
          type: "type1",
          branches: [],
          products: [],
          _rid: "string",
          _self: "string",
          _etag: "string",
          _attachments: "string",
          _ts: 1
        },
        {
          id: "2",
          name: "contact2",
          email: "email2",
          phone: "phone2",
          type: "type2",
          branches: [],
          products: [],
          _rid: "string",
          _self: "string",
          _etag: "string",
          _attachments: "string",
          _ts: 2
        },
        {
          id: "3",
          name: "contact3",
          email: "email3",
          phone: "phone3",
          type: "type3",
          branches: [],
          products: [],
          _rid: "string",
          _self: "string",
          _etag: "string",
          _attachments: "string",
          _ts: 3
        }
      ];
    });
  }

  navigateToContactDetailsPage(contactId) {
    this.router.navigateByUrl('/branches/' + this.branchId + '/' + contactId);
  }

  navigateToCreateContactPage() {
    this.router.navigateByUrl('/branches/' + this.branchId + '/create-contact');
  }


  deleteContact(event, contactId) {
    event.stopPropagation();
    console.log('deleteContact', contactId);
    /* Call delete contact here */
    /* Then should display new list of contact*/
  }
}
