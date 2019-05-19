import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/userdata.model';

@Component({
  selector: 'create-contact-page',
  templateUrl: './create-contact-page.component.html',
  styleUrls: ['./create-contact-page.component.scss']
})
export class CreateContactPageComponent implements OnInit {

  public branchName = 'Atlanta';
  public availableProducts: Product[] = [];

  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public emailAddress: string;

  // Array of ids of products selected
  public selectedProducts: string[];

  constructor(private router: Router) {}

  ngOnInit() {
    /* Replace with current branch context */
    this.branchName = 'Atlanta';

    /* Replace with available products for this branch */
    this.availableProducts = [
      {
        id: '1',
        name: 'prod1'
      },
      {
        id: '2',
        name: 'prod2'
      },
      {
        id: '3',
        name: 'prod3'
      },
      {
        id: '4',
        name: 'prod4'
      },
      {
        id: '5',
        name: 'prod5'
      },
      {
        id: '6',
        name: 'prod6'
      },
      {
        id: '7',
        name: 'prod7'
      },
      {
        id: '8',
        name: 'prod8'
      }
    ];
  }

  public onCreateContact() {
    console.log('onCreateContact',
    this.firstName, this.lastName, this.branchName, this.emailAddress, this.phoneNumber, this.selectedProducts);

    /* branch id */
    this.router.navigateByUrl('/branches/' + '1');
  }

}
