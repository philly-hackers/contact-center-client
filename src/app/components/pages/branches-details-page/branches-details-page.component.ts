import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, Branch } from 'src/app/shared/models/userdata.model';
import { BranchesService } from 'src/app/shared/services/branches.service';
import { ContactService } from 'src/app/shared/services/contact.service';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'branches-details-page',
  templateUrl: './branches-details-page.component.html',
  styleUrls: ['./branches-details-page.component.scss']
})
export class BranchesDetailsPageComponent implements OnInit {
  public branchId: string;
  public branch: Branch;
  public contacts: Contact[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private branchService: BranchesService, private searchService: SearchService) {}

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


  deleteContact(event, contactId) {
    event.stopPropagation();
    console.log('deleteContact', contactId);
    /* Call delete contact here */
    /* Then should display new list of contact*/
  }
}
