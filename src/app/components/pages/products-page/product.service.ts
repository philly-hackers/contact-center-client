import { Injectable } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Broadcaster } from '../../../shared/services/broadcaster.service';
import { ProductData } from '../../../shared/models/productData.model';
import { BehaviorSubject } from 'rxjs';
import { ProductAddUpdateResponse } from '../../../shared/models/productData.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  branchPostURL = 'https://chubbcontactcenterapi.azurewebsites.net/api/product';
  public addProductResponse: BehaviorSubject<ProductAddUpdateResponse> = new BehaviorSubject<ProductAddUpdateResponse>( null );

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  get addProductData() {
    return this.addProductResponse.asObservable();
  }

  addNewProduct(params: object) {
    this.dataService.postRequest(this.branchPostURL, params).subscribe((data: ProductAddUpdateResponse) => {
        this.addProductResponse.next(data);
    });
  }

  updateProduct(params: object) {
    this.dataService.putRequest(this.branchPostURL, params).subscribe((data: ProductAddUpdateResponse) => {
        this.addProductResponse.next(data);
    });
  }
}
