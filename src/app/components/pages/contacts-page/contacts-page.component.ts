import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Broadcaster } from '../../../shared/services/broadcaster.service';
import { ContactData } from '../../../shared/models/contactData.model';
import { Subscription } from 'rxjs';
import { ContactService } from './contact.service';

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
      'name': 'Siddharth Gupta',
      'email': 'sgupta@contact.com',
      'phone': '1234567890',
      'type': 'Marketing Rep',
      'branches': [
        {
          'id': 'ba7910a6-13c1-7f05-0cab-fe7dd01851cd',
          'name': null,
          'address': null,
          'geolocation': null
        },
        {
          'id': '634a2962-82cb-4611-6d5d-8cf648c9952d',
          'name': null,
          'address': null,
          'geolocation': null
        }
      ],
      'products': [
        {
          'id': '86cfbfe5-8e43-be0f-54ee-9ca925765845',
          'name': null,
          'category': null,
          'branches': [
            {
              'id': 'ba7910a6-13c1-7f05-0cab-fe7dd01851cd',
              'name': null,
              'address': null,
              'geolocation': null,
              'isActive': null
            }
          ],
          'isActive': null
        }
      ],
      'isActive': null,
    };
    params = params ? params : tempParams;
    this.contactService.addNewContact(params);

    this.subscriptions.push(
      this.contactService.addContactData.subscribe( (data: ProductAddUpdateResponse) => {
        console.log('Add Product Data ' + data.name, data.id);
      })
    );
  }

  updateProduct(params: object) {
    const tempParams = {
      'id': '817cdcb2-8c52-491e-8d5a-c8a35923e661',
      'name': 'Siddharth Gupta',
      'email': 'sgupta@contact.com',
      'phone': '1234567890',
      'type': 'Marketing Rep',
      'branches': [
        {
          'id': 'ba7910a6-13c1-7f05-0cab-fe7dd01851cd',
          'name': null,
          'address': null,
          'geolocation': null
        },
        {
          'id': '634a2962-82cb-4611-6d5d-8cf648c9952d',
          'name': null,
          'address': null,
          'geolocation': null
        }
      ],
      'products': [
        {
          'id': '86cfbfe5-8e43-be0f-54ee-9ca925765845',
          'name': null,
          'category': null,
          'branches': [
            {
              'id': 'ba7910a6-13c1-7f05-0cab-fe7dd01851cd',
              'name': null,
              'address': null,
              'geolocation': null,
              'isActive': null
            }
          ],
          'isActive': null
        }
      ],
      'isActive': null,
    };
    params = params ? params : tempParams;
    this.contactService.updateContact(params);
    this.subscriptions.push(
      this.contactService.addContactData.subscribe( (data: ProductAddUpdateResponse) => {
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
