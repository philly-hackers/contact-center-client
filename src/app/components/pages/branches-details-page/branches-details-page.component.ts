import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, Branch } from 'src/app/shared/models/userdata.model';
import { BranchesService } from 'src/app/shared/services/branches.service';
import { ContactService } from 'src/app/shared/services/contact.service';
import { SearchService } from 'src/app/search.service';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

@Component({
  selector: 'branches-details-page',
  templateUrl: './branches-details-page.component.html',
  styleUrls: ['./branches-details-page.component.scss']
})
export class BranchesDetailsPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  public branchId: string;
  public branch: Branch;
  public contacts: Contact[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private branchService: BranchesService, private searchService: SearchService,
    private contactService: ContactService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.branchId = JSON.stringify(params.get('branchId')).replace(/\"/g, '');
      this.branchService.getBranchDataById(this.branchId);
      this.branchService.getBranchData.subscribe(branch => {
        this.branch = branch;
      });

      this.searchService.getContactDetails(this.branchId);
      this.searchService.getContactsData.subscribe(contacts => {
        this.contacts = contacts;
      });
    });
  }

  navigateToContactDetailsPage(contactId) {
    this.router.navigateByUrl('/branches/' + this.branchId + '/' + contactId);
  }

  navigateToCreateContactPage() {
    this.router.navigateByUrl('/branches/' + this.branchId + '/create-contact');
  }


  deleteContact(event, contact) {
    event.stopPropagation();
    console.log('deleteContact', contact.id);

    const params = {
      'id': contact.id,
      'name': contact.firstName,
      'email': contact.emailAddress,
      'phone': contact.phoneNumber,
      'type': contact.contactType,
      'branches': contact.branches,
      'products': contact.products,
      'isactive': false
    };

    this.contactService.deleteContact(params);

    this.subscriptions.push(
      this.contactService.addContactData
        .pipe(skipWhile(data => data !== data))
        .subscribe(data => {
          this.contacts = this.contacts.filter(contactItem => contactItem.id !== data.id);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
