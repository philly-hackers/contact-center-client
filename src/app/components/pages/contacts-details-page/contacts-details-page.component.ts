import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact, Branch } from 'src/app/shared/models/userdata.model';

@Component({
  selector: 'contacts-details-page',
  templateUrl: './contacts-details-page.component.html',
  styleUrls: ['./contacts-details-page.component.scss']
})
export class ContactsDetailsPageComponent implements OnInit {
  public contactId: string;
  public contact: Contact;
  public branch: Branch;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /* Replace with get branch object */
    this.branch = {
      id: 'branch1',
      name: 'branch1'
    };

    this.route.paramMap.subscribe(params => {
        this.contactId = params.get('contactId');

        /* Replace with get contact by id */
        this.contact = {
          id: "1",
          name: "contact1",
          email: "email1",
          phone: "phone1",
          type: "type1",
          branches: [],
          products: [
            {
              id: 'product1',
              name: 'product1'
            },
            {
              id: 'product2',
              name: 'product2'
            },
            {
              id: 'product3',
              name: 'product3'
            }
          ],
          _rid: "string",
          _self: "string",
          _etag: "string",
          _attachments: "string",
          _ts: 1
        };
      }
    );
  }
}
