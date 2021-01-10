import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestcompanyKpiComponent } from './bestcompany-kpi.component';

describe('BestcompanyKpiComponent', () => {
  let component: BestcompanyKpiComponent;
  let fixture: ComponentFixture<BestcompanyKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestcompanyKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestcompanyKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
