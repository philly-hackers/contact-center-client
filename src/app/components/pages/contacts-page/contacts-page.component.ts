import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Broadcaster } from '../../../shared/services/broadcaster.service';
import { ContactData } from '../../../shared/models/contactData.model';
import { Subscription } from 'rxjs';
import { ContactService } from './contact.service';
import { ContactAddUpdateResponse } from '../../../shared/models/contactData.model';

@Component({
  selector: 'contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor( private contactService: ContactService, private broadcaster: Broadcaster) { }

  ngOnInit() {
  }

  addProduct(params: object) {
    const tempParams = {
      'name': 'Demo Contact',
      'email': 'demo@contact.com',
      'phone': '1234567890',
      'type': 'Marketing Rep',
      'branches': [
        {
          'id': '2b76ff72-a609-4425-a96f-3c564eab5eb8',
          'name': 'Atlanta',
          'address': '11575 Great Oaks Way \nSuite 200\nAlpharetta, GA 30022 \nT 678-795-4000',
          'geolocation': '34.0603291,-84.2700786',
          'isactive': null
        },
        {
          'id': 'ceb5c17e-9144-ef3f-fcbe-963fb1f59002',
          'name': 'Cincinnati',
          'address': '312 Walnut Street\nSuite 2100\nCincinnati, OH 45202-4066\nT 513-721-0601\nF 513-651-6088',
          'geolocation': '40.728157, -74.077644',
          'isactive': null
        }
      ],
      'products': [
        {
          'id': 'f919b8f3-ae7a-4d28-a5bc-32c3086b0e1a',
          'name': 'CyberTest',
          'category': 'Small Commercial',
          'branches': null,
          'isactive': null
        }
      ],
      'isactive': 'true'
    };
    params = params ? params : tempParams;
    this.contactService.addNewContact(params);

    this.subscriptions.push(
      this.contactService.addContactData.subscribe( (data: ContactAddUpdateResponse) => {
        console.log('Add Product Data ' + data.name, data.id);
      })
    );
  }

  updateProduct(params: object) {
    const tempParams = {
      'id': '2e5da076-89dd-428b-8b58-0443b579267f',
      'name': 'Demo Contact',
      'email': 'demo@contact.com',
      'phone': '1234567890',
      'type': 'Marketing Rep',
      'branches': [
        {
          'id': '2b76ff72-a609-4425-a96f-3c564eab5eb8',
          'name': 'Atlanta',
          'address': '11575 Great Oaks Way \nSuite 200\nAlpharetta, GA 30022 \nT 678-795-4000',
          'geolocation': '34.0603291,-84.2700786',
          'isactive': null
        },
        {
          'id': 'ceb5c17e-9144-ef3f-fcbe-963fb1f59002',
          'name': 'Cincinnati',
          'address': '312 Walnut Street\nSuite 2100\nCincinnati, OH 45202-4066\nT 513-721-0601\nF 513-651-6088',
          'geolocation': '40.728157, -74.077644',
          'isactive': null
        }
      ],
      'products': [
        {
          'id': 'f919b8f3-ae7a-4d28-a5bc-32c3086b0e1a',
          'name': 'CyberTest',
          'category': 'Small Commercial',
          'branches': null,
          'isactive': null
        }
      ],
      'isactive': 'true'
  };
    params = params ? params : tempParams;
    this.contactService.updateContact(params);
    this.subscriptions.push(
      this.contactService.addContactData.subscribe( (data: ContactAddUpdateResponse) => {
        console.log('Add Product Data ' + data.name, data.id);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
