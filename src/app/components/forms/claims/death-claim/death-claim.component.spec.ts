import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathClaimComponent } from './death-claim.component';

describe('DeathClaimComponent', () => {
  let component: DeathClaimComponent;
  let fixture: ComponentFixture<DeathClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeathClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeathClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
