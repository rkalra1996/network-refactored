import { TestBed } from '@angular/core/testing';

import { GraphVisualizerService } from './graph-visualizer.service';

describe('GraphVisualizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphVisualizerService = TestBed.get(GraphVisualizerService);
    expect(service).toBeTruthy();
  });
});
