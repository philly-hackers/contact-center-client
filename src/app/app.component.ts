import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Broadcaster } from './shared/services/broadcaster.service';
import { SearchService } from './search.service';
import { ContextService } from './shared/services/context.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  public showProgressBar = false;
  public isLoggedIn = false;
  public username: string;

  title = 'app';
  color = '#CCCCCC';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  constructor(private router: Router, private broadcaster: Broadcaster, 
    private searchService: SearchService, private contextService: ContextService) {
  }

  ngOnInit() {
    this.router.events.subscribe(v => {
      this.isLoggedIn = this.contextService.auth && this.contextService.auth !== 'false';

      if (this.isLoggedIn) {
        this.username = this.contextService.auth;
      }
    });

    this.broadcaster.on('loader').subscribe((data: any) => {
      if (data) {
        this.showProgressBar = data;
      }
    });
  }

  public logout() {
    this.contextService.auth = 'false';
    this.username = undefined;
    this.router.navigateByUrl('/login');
  }

  public navigateToLogInPage() {
    this.router.navigateByUrl('/login');
  }
}
