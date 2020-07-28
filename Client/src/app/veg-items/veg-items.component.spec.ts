import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VegItemsComponent } from './veg-items.component';

describe('VegItemsComponent', () => {
  let component: VegItemsComponent;
  let fixture: ComponentFixture<VegItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VegItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
