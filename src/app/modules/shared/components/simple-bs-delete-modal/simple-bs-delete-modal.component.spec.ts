import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleBsModalComponent } from './simple-bs-delete-modal.component';

describe('SimpleBsModalComponent', () => {
  let component: SimpleBsModalComponent;
  let fixture: ComponentFixture<SimpleBsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleBsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleBsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
