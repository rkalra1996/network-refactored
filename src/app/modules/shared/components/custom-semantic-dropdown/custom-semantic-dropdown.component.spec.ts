import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSemanticDropdownComponent } from './custom-semantic-dropdown.component';

describe('CustomSemanticDropdownComponent', () => {
  let component: CustomSemanticDropdownComponent;
  let fixture: ComponentFixture<CustomSemanticDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSemanticDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSemanticDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
