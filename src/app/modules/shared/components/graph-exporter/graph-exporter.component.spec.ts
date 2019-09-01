import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphExporterComponent } from './graph-exporter.component';

describe('GraphExporterComponent', () => {
  let component: GraphExporterComponent;
  let fixture: ComponentFixture<GraphExporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphExporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
