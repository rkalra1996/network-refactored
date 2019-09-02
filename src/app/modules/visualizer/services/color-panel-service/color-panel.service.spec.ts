import { TestBed } from '@angular/core/testing';

import { ColorPanelService } from './color-panel.service';

describe('ColorPanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorPanelService = TestBed.get(ColorPanelService);
    expect(service).toBeTruthy();
  });
});
