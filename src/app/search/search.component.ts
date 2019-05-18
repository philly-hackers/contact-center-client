import { Component, OnInit } from '@angular/core';
import { Broadcaster } from '../shared/services/broadcaster.service';
import { SearchService } from '../search.service';
import { UserData } from '../shared/models/userdata.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  branches: UserData[];

  constructor(private broadcaster: Broadcaster, private searchService: SearchService) {  }

  ngOnInit() {
    this.searchService.getBranchDetails();
    this.searchService.getBranchesData.subscribe(data => {
      this.branches = data;

      setTimeout(() => {
        this.broadcaster.broadcast('loader', false);
      }, 2000);
    });
  }

}
