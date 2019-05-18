import { Component } from '@angular/core';
import { Broadcaster } from '../../../shared/services/broadcaster.service';
import { SearchService } from '../../../search.service';
import { UserData } from '../../../shared/models/userdata.model';
import { of } from 'rxjs';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  public branches: UserData[] = [];
  public selectedBranchId = null;
  private selectedBranch = null;

  public products = [];
  public selectedProductId = 'All';

  private contacts = [];
  public displayedContacts = [];

  constructor(private broadcaster: Broadcaster, private searchService: SearchService) {  }

  ngOnInit() {
    this.searchService.getBranchDetails();
    this.searchService.getBranchesData.subscribe(data => {
      this.branches = data;
      setTimeout(() => {
        this.broadcaster.broadcast('loader', false);
      }, 2000);
    });
  }

  resetFields() {
    this.selectedProductId = 'All';
    this.contacts = [];
    this.displayedContacts = [];
    this.products = [];
  }

  onBranchSelect(branchId) {
    console.log('selected branch', branchId);

    let newBranch = this.branches.find(branch => branch.id == branchId) || null;

    if(newBranch && (this.selectedBranch === null || this.selectedBranch.id !== newBranch)) {
      this.selectedBranchId = branchId;
      this.selectedBranch = newBranch;
      this.resetFields();

      // Fetch updated contacts
      this.fetchContactListResults();
    }
  }

  onProductSelect(productId) {
    console.log('selected product', productId, this.products);

    let newProduct =  this.products.find(products => products.id == productId) || null;

    if(productId === 'All') {
      this.displayedContacts = this.contacts;
    } else if(newProduct) {
      this.displayedContacts = this.contacts.filter(contact => {
        return contact.products.find(product => {
          return product.id === productId;
        });
      });
    } else {
      this.displayedContacts = [];
    }
  }

  fetchContactListResults() {
    /* Replace with call*/
    
    of(this.mockContacts).subscribe(contacts => {
      let newProductListObject = {};

      contacts.forEach(contact => {
        contact.products.forEach(v => {
          newProductListObject[v.id] = v;
        });
      });

      this.products = Object.values(newProductListObject);

      this.contacts = contacts;
      this.onProductSelect('All');
    });
  }

  public mockContacts = [
    {
      id: 'c1',
      firstName: 'Willian',
      lastName: 'Hua',
      phoneNumber: '+1-123-123-1234',
      emailAddress: 'asdtest@testasd.com',
      products: [
        {
          id: 'p1',
          name: 'Product1'
        },
        {
          id: 'p2',
          name: 'Product 2',
        },
        {
          id: 'p3',
          name: 'Prod 3',
        },
        {
          id: 'p4',
          name: 'Product12345',
        },
        {
          id: 'p5',
          name: 'Product T',
        },
        {
          id: 'p6',
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
          id: 'p1',
          name: 'Product1',
        },
        {
          id: 'p1',
          name: 'Product 2',
        },
        {
          id: 'p2',
          name: 'Prod 3',
        },
        {
          id: 'p3',
          name: 'Product12345',
        },
        {
          id: 'p7',
          name: 'Product T',
        },
        {
          id: 'p8',
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
          id: 'p1',
          name: 'Product1',
        },
        {
          id: 'p1',
          name: 'Product 2',
        },
        {
          id: 'p1',
          name: 'Prod 3',
        },
        {
          id: 'p1',
          name: 'Product12345',
        },
        {
          id: 'p1',
          name: 'Product T',
        },
        {
          id: 'p1',
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
          id: 'p1',
          name: 'Product1',
        },
        {
          id: 'p1',
          name: 'Product 2',
        },
        {
          id: 'p1',
          name: 'Prod 3',
        },
        {
          id: 'p1',
          name: 'Product12345',
        },
        {
          id: 'p1',
          name: 'Product T',
        },
        {
          id: 'p1',
          name: 'Prd6',
        }
      ]
    }
  ];

  public getTarget(id) {
    return '#' + id;
  }
  
}
