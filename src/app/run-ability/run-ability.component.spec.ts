import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAbilityComponent } from './run-ability.component';

describe('RunAbilityComponent', () => {
  let component: RunAbilityComponent;
  let fixture: ComponentFixture<RunAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunAbilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
