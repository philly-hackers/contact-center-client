import { TestBed, inject } from '@angular/core/testing';

import { BrachesService } from './braches.service';

describe('BrachesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrachesService]
    });
  });

  it('should be created', inject([BrachesService], (service: BrachesService) => {
    expect(service).toBeTruthy();
  }));
});
