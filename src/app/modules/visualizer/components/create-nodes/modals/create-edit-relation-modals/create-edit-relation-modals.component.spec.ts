import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditRelationModalsComponent } from './create-edit-relation-modals.component';

describe('CreateEditRelationModalsComponent', () => {
  let component: CreateEditRelationModalsComponent;
  let fixture: ComponentFixture<CreateEditRelationModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditRelationModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditRelationModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
