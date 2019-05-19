import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Broadcaster } from './broadcaster.service';
import { ContactAddUpdateResponse } from '../models/contactData.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  branchPostURL = 'https://chubbcontactcenterapi.azurewebsites.net/api/contact';
  public addContactResponse: BehaviorSubject<ContactAddUpdateResponse> = new BehaviorSubject<ContactAddUpdateResponse>( null );

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  get addContactData() {
    return this.addContactResponse.asObservable();
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
}
