import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdRegisterComponent } from './id-register.component';

describe('IdRegisterComponent', () => {
  let component: IdRegisterComponent;
  let fixture: ComponentFixture<IdRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
