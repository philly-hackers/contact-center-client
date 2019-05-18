import { Component } from '@angular/core';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public contacts = [
    {
      id: 'c1',
      firstName: 'Willian',
      lastName: 'Hua',
      phoneNumber: '+1-123-123-1234',
      emailAddress: 'asdtest@testasd.com',
      products: [
        {
          name: 'Product1',
        },
        {
          name: 'Product 2',
        },
        {
          name: 'Prod 3',
        },
        {
          name: 'Product12345',
        },
        {
          name: 'Product T',
        },
        {
          name: 'Prd6',
        }
      ]
    },
    {
      id: 'c2',
      firstName: 'Willian',
      lastName: 'Hua',
      phoneNumber: '+1-123-123-1234',
      emailAddress: 'asdtest@testasd.com',
      products: [
        {
          name: 'Product1',
        },
        {
          name: 'Product 2',
        },
        {
          name: 'Prod 3',
        },
        {
          name: 'Product12345',
        },
        {
          name: 'Product T',
        },
        {
          name: 'Prd6',
        }
      ]
    },
    {
      id: 'c3',
      firstName: 'Willian',
      lastName: 'Hua',
      phoneNumber: '+1-123-123-1234',
      emailAddress: 'asdtest@testasd.com',
      products: [
        {
          name: 'Product1',
        },
        {
          name: 'Product 2',
        },
        {
          name: 'Prod 3',
        },
        {
          name: 'Product12345',
        },
        {
          name: 'Product T',
        },
        {
          name: 'Prd6',
        }
      ]
    },
    {
      id: 'c4',
      firstName: 'Willian',
      lastName: 'Hua',
      phoneNumber: '+1-123-123-1234',
      emailAddress: 'asdtest@testasd.com',
      products: [
        {
          name: 'Product1',
        },
        {
          name: 'Product 2',
        },
        {
          name: 'Prod 3',
        },
        {
          name: 'Product12345',
        },
        {
          name: 'Product T',
        },
        {
          name: 'Prd6',
        }
      ]
    }
  ];

  public getTarget(id) {
    return '#' + id;
  }
}
