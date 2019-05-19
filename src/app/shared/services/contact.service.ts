import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Broadcaster } from './broadcaster.service';
import { ContactData, ContactAddUpdateResponse } from '../models/contactData.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  branchPostURL = 'https://chubbcontactcenterapi.azurewebsites.net/api/contact/';
  baseContactURL = 'https://chubbcontactcenterapi.azurewebsites.net/api/contact/id=';

  public addContactResponse: BehaviorSubject<ContactAddUpdateResponse> = new BehaviorSubject<ContactAddUpdateResponse>( null );
  public contactData: BehaviorSubject<ContactData> = new BehaviorSubject<ContactData>(null);

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  get addContactData() {
    return this.addContactResponse.asObservable();
  }

  get getContactData() {
    return this.contactData.asObservable();
  }

  addNewContact(params: object) {
    this.dataService.postRequest(this.branchPostURL, params).subscribe((data: ContactAddUpdateResponse) => {
        this.addContactResponse.next(data);
    });
  }

  updateContact(params: object) {
    this.dataService.putRequest(this.branchPostURL, params).subscribe((data: ContactAddUpdateResponse) => {
        this.addContactResponse.next(data);
    });
  }

  getContactById(params: string) {
    this.dataService.getRequest(this.branchPostURL, params).subscribe((data) => {
      this.contactData.next(data);
    });
  }
}
