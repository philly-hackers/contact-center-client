import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './shared/services/data.service';
import { Broadcaster } from './shared/services/broadcaster.service';
import { SearchService } from './search.service';
import { UserData } from './shared/models/userdata.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private broadcaster: Broadcaster, private searchService: SearchService) {}

  public isLoggedIn = false;
  showProgressBar: Boolean = true;
  title = 'app';
  color = '#CCCCCC';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  searchDataResponse: UserData[];

  ngOnInit() {
    this.searchService.getSearchResult();
    this.searchService.searchData.subscribe(data => {
      this.searchDataResponse = data;
      setTimeout(() => {
        this.broadcaster.broadcast('loader', false);
      }, 2000);
      console.log(this.searchDataResponse);
    });

    this.router.events.subscribe(v => {
      this.isLoggedIn = !window.location.href.includes('login');
    });
    this.broadcaster.on('loader').subscribe( ( data: Boolean) => {
      this.showProgressBar = data;
    });
  }

  public logout() {
    this.router.navigateByUrl('/login');
  }
}
