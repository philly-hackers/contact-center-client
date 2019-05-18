import { Injectable } from '@angular/core';
import { DataService } from './shared/services/data.service';
import { UserData } from './shared/models/userdata.model';
import { BehaviorSubject } from 'rxjs';
import { Broadcaster } from './shared/services/broadcaster.service';

const INIT_DATA = []

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchData = new BehaviorSubject<any>('searchData');
  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }


  getSearchResult() {
    this.broadcaster.broadcast('loader', true);
    const params = {};
    const _baseURL = '/app/getData';
    this.dataService.getRequest(_baseURL, params).subscribe( (data: UserData) => {
      this.searchData.next(data);
    });
  }
}
