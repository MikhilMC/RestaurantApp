import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsTodayComponent } from './discounts-today.component';

describe('DiscountsTodayComponent', () => {
  let component: DiscountsTodayComponent;
  let fixture: ComponentFixture<DiscountsTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountsTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
