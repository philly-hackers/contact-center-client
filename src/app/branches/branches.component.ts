import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Broadcaster } from '../shared/services/broadcaster.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  constructor( private dataService: DataService, private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.broadcaster.broadcast('loader', true);
  }

}
