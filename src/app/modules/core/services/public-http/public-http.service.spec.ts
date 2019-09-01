import { TestBed } from '@angular/core/testing';

import { PublicHttpService } from './public-http.service';

describe('PublicHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicHttpService = TestBed.get(PublicHttpService);
    expect(service).toBeTruthy();
  });
});
