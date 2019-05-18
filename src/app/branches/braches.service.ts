import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class BrachesService {

  constructor(private dataService: DataService) { }
}
