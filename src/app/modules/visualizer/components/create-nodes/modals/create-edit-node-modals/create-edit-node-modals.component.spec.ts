import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditNodeModalsComponent } from './create-edit-node-modals.component';

describe('CreateEditNodeModalsComponent', () => {
  let component: CreateEditNodeModalsComponent;
  let fixture: ComponentFixture<CreateEditNodeModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditNodeModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditNodeModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
