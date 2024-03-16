import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropLossClaimComponent } from './prop-loss-claim.component';

describe('PropLossClaimComponent', () => {
  let component: PropLossClaimComponent;
  let fixture: ComponentFixture<PropLossClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropLossClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropLossClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
