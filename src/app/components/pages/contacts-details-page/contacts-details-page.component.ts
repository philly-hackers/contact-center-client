import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Contact, Branch } from "src/app/shared/models/userdata.model";
import { ContactService } from "src/app/shared/services/contact.service";

@Component({
  selector: "contacts-details-page",
  templateUrl: "./contacts-details-page.component.html",
  styleUrls: ["./contacts-details-page.component.scss"]
})
export class ContactsDetailsPageComponent implements OnInit {
  public contactId: string;
  public contact: Contact;
  public branch: Branch;
  public branchId: string;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  getBranchRoute() {
    return "/branches/" + this.branchId;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.branchId = params.get("branchId");
    });

    /* Replace with get branch object */
    this.branch = {
      id: "branch1",
      name: "branch1"
    };

    this.route.paramMap.subscribe(params => {
      this.contactId = JSON.stringify(params.get("contactId")).replace(
        /\"/g,
        ""
      );

      this.contactService.getContactById(this.contactId);
      this.contactService.getContactData.subscribe(contact => {
        this.contact = contact;
      });
    });
  }
}
