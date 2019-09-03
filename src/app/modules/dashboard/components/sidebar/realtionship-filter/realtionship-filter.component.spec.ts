import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtionshipFilterComponent } from './realtionship-filter.component';

describe('RealtionshipFilterComponent', () => {
  let component: RealtionshipFilterComponent;
  let fixture: ComponentFixture<RealtionshipFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtionshipFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtionshipFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
