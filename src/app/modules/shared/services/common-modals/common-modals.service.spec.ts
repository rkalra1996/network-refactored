import { TestBed } from '@angular/core/testing';

import { CommonModalsService } from './common-modals.service';

describe('CommonModalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonModalsService = TestBed.get(CommonModalsService);
    expect(service).toBeTruthy();
  });
});
