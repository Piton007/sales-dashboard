import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySalesTable } from './summary-sales.component';

describe('SummarySalesComponent', () => {
  let component: SummarySalesTable;
  let fixture: ComponentFixture<SummarySalesTable>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarySalesTable ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySalesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
