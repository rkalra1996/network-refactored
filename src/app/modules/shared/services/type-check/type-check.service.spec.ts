import { TestBed } from '@angular/core/testing';

import { TypeCheckService } from './type-check.service';

describe('TypeCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeCheckService = TestBed.get(TypeCheckService);
    expect(service).toBeTruthy();
  });
});
