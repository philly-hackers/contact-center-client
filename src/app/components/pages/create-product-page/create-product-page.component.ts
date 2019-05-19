import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss']
})
export class CreateProductPageComponent {

  public productName: string;

  constructor(private router: Router) {}

  public onCreateProduct() {
    console.log('onCreateProduct', this.productName);
    this.router.navigateByUrl('/branches');
  }
}
