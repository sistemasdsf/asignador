import { TestBed } from '@angular/core/testing';

import { HandleAllocationService } from './handle-allocation.service';

describe('HandleAllocationService', () => {
  let service: HandleAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
