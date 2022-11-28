import { TestBed } from '@angular/core/testing';

import { RoomuserService } from './roomuser.service';

describe('RoomuserService', () => {
  let service: RoomuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
