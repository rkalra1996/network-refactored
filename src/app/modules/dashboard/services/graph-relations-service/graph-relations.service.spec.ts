import { TestBed } from '@angular/core/testing';

import { GraphRelationsService } from './graph-relations.service';

describe('GraphRelationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphRelationsService = TestBed.get(GraphRelationsService);
    expect(service).toBeTruthy();
  });
});
