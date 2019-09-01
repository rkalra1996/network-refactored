import { TestBed } from '@angular/core/testing';

import { GraphExportService } from './graph-export.service';

describe('GraphExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphExportService = TestBed.get(GraphExportService);
    expect(service).toBeTruthy();
  });
});
