import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDatabaseComponent } from './empty-database.component';

describe('EmptyDatabaseComponent', () => {
  let component: EmptyDatabaseComponent;
  let fixture: ComponentFixture<EmptyDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
