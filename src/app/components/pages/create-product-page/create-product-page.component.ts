import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss']
})
export class CreateProductPageComponent {

  constructor(private router: Router) {}

  public onCreateProduct() {
    this.router.navigateByUrl('/branches');
  }
}
