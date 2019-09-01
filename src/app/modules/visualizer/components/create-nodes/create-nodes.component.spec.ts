import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNodesComponent } from './create-nodes.component';

describe('CreateNodesComponent', () => {
  let component: CreateNodesComponent;
  let fixture: ComponentFixture<CreateNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
