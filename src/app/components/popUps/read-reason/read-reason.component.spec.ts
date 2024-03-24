import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadReasonComponent } from './read-reason.component';

describe('ReadReasonComponent', () => {
  let component: ReadReasonComponent;
  let fixture: ComponentFixture<ReadReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
