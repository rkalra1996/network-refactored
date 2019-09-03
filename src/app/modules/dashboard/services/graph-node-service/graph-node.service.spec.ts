import { TestBed } from '@angular/core/testing';

import { GraphNodeService } from './graph-node.service';

describe('GraphNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphNodeService = TestBed.get(GraphNodeService);
    expect(service).toBeTruthy();
  });
});
