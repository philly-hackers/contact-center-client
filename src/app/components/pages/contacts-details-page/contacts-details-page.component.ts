import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact, Branch, Product } from 'src/app/shared/models/userdata.model';
import { ContactService } from 'src/app/shared/services/contact.service';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'contacts-details-page',
  templateUrl: './contacts-details-page.component.html',
  styleUrls: ['./contacts-details-page.component.scss']
})
export class ContactsDetailsPageComponent implements OnInit {
  public contactId: string;
  public contact: Contact;
  public branch: Branch;
  public branchId: string;
  
  public editing = false;

  public products: Product[];
  
  public name: string;
  public phoneNumber: string;
  public emailAddress: string;
  public contactType: string;

  // Array of ids of products selected
  public selectedProducts: string[];
  
  public availableBranches: Branch[];
  public selectedBranch: string;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private searchService: SearchService
  ) {}

  getBranchRoute() {
    return this.branchId ? '/branches/' +  this.branchId : '/branches';
  }

  ngOnInit() {
    this.searchService.getBranchDetails();
    this.searchService.getBranchesData.subscribe(data => {
      this.availableBranches = data;
    });

    this.route.paramMap.subscribe(params => {
      this.contactId = JSON.stringify(params.get('contactId')).replace(/\"/g, '');
      this.branchId = JSON.stringify(params.get('branchId')).replace(/\"/g, '');

      this.contactService.getContactById(this.contactId);
      this.contactService.getContactData.subscribe(contact => {
        this.contact = contact;
      });
    });
  }

  editContact() {
    this.editing = true;
    
    // Set form values
    this.name = this.contact.name;
    this.phoneNumber = this.contact.phone;
    this.emailAddress = this.contact.email;
    this.contactType = this.contact.type;
    this.selectedBranch = this.contact.branches[0].id;
    this.selectedProducts = this.contact.products.map(product => product.id);
  }

  saveContact() {
    this.editing = false;
  }

  cancelEdit(){
    this.editing = false;
  }
}
