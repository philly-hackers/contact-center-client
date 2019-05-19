import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Broadcaster } from '../shared/services/broadcaster.service';
import { BrachesService } from './braches.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  constructor( private branchService: BrachesService, private broadcaster: Broadcaster) { }

  ngOnInit() {

  }

  addBranch(params) {
    const tempParams = {
      'name': 'Atlanta',
      'address': '11575 Great Oaks Way \nSuite 200\nAlpharetta, GA 30022 \nT 678-795-4000',
      'geolocation': '34.0603291,-84.2700786',
      'isactive': null
    };
    params = params ? params : tempParams;

    this.branchService.addNewBranch(params);

  }

}
