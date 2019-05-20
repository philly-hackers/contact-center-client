import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Broadcaster } from './broadcaster.service';
import { BehaviorSubject } from 'rxjs';
import { ProductData, ProductAddUpdateResponse } from '../models/productData.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  branchPostURL = 'https://chubbcontactcenterapi.azurewebsites.net/api/product/';
  baseProductURL = 'https://chubbcontactcenterapi.azurewebsites.net/api/product/branch/id=';
  public addProductResponse: BehaviorSubject<ProductAddUpdateResponse> = new BehaviorSubject<ProductAddUpdateResponse>( null );
  public productData: BehaviorSubject<ProductData> = new BehaviorSubject<ProductData>(null);
  public allProductsData: BehaviorSubject<ProductData[]> = new BehaviorSubject<ProductData[]>([]);
  public productsByBranchData: BehaviorSubject<ProductData[]> = new BehaviorSubject<ProductData[]>([]);

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  get addProductsData() {
    return this.allProductsData.asObservable();
  }

  get getProductsDataByBranch() {
    return this.productsByBranchData.asObservable();
  }

  get getNewAddedProduct() {
    return this.addProductResponse.asObservable();
  }

  getAllProducts() {
    this.dataService.getRequest(this.branchPostURL, '').subscribe((data) => {
      this.allProductsData.next(data);
    });
  }

  getProductsByBranchId(params: string) {
    this.dataService.getRequest(this.baseProductURL, params).subscribe((data) => {
      this.productsByBranchData.next(data);
    });
  }

  getProductsByBranchName(params: string) {
    this.dataService.getRequest(this.baseProductURL, params).subscribe((data) => {
      this.productsByBranchData.next(data);
    });
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
