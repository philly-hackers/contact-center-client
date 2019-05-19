import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'create-contact-page',
  templateUrl: './create-contact-page.component.html',
  styleUrls: ['./create-contact-page.component.scss']
})
export class CreateContactPageComponent {
  
  constructor(private router: Router) {}
  
  public onCreateContact() {
    /* branch id */
    this.router.navigateByUrl('/branches/' + '1');
  }

}
