import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './shared/services/data.service';
import { Broadcaster } from './shared/services/broadcaster.service';
import { SearchService } from './search.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  public showProgressBar = false;
  public isLoggedIn = false;
  title = 'app';
  color = '#CCCCCC';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  constructor(private router: Router, private broadcaster: Broadcaster, private searchService: SearchService) {
  }

  ngOnInit() {
    this.router.events.subscribe(v => {
      this.isLoggedIn = !window.location.href.includes('login');
    });

    this.broadcaster.on('loader').subscribe((data: any) => {
      if (data) {
        this.showProgressBar = data;
      }
    });
  }

  public logout() {
    this.router.navigateByUrl('/login');
  }
}
