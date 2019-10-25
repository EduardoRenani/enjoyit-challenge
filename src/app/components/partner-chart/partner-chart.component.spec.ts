import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerChartComponent } from './partner-chart.component';

describe('PartnerChartComponent', () => {
  let component: PartnerChartComponent;
  let fixture: ComponentFixture<PartnerChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
