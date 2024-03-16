import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLiaClaimComponent } from './public-lia-claim.component';

describe('PublicLiaClaimComponent', () => {
  let component: PublicLiaClaimComponent;
  let fixture: ComponentFixture<PublicLiaClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicLiaClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicLiaClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
