import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestmonthKpiComponent } from './bestmonth-kpi.component';

describe('BestmonthKpiComponent', () => {
  let component: BestmonthKpiComponent;
  let fixture: ComponentFixture<BestmonthKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestmonthKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestmonthKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
