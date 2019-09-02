import { TestBed } from '@angular/core/testing';

import { SharedGraphService } from './shared-graph.service';

describe('SharedGraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedGraphService = TestBed.get(SharedGraphService);
    expect(service).toBeTruthy();
  });
});
