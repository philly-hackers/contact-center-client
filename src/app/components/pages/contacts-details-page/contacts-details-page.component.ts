import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contacts-details-page',
  templateUrl: './contacts-details-page.component.html',
  styleUrls: ['./contacts-details-page.component.scss']
})
export class ContactsDetailsPageComponent implements OnInit {
  public contactId: string;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.contactId = params.get('contactId');
      }
    );
  }
}
