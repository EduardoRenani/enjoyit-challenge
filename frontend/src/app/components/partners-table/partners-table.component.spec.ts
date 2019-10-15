import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersTableComponent } from './partners-table.component';

describe('PartnersTableComponent', () => {
  let component: PartnersTableComponent;
  let fixture: ComponentFixture<PartnersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
