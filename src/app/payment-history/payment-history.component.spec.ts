import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHitoryComponent } from './payment-history.component';

describe('PaymentHitoryComponent', () => {
  let component: PaymentHitoryComponent;
  let fixture: ComponentFixture<PaymentHitoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentHitoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHitoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
