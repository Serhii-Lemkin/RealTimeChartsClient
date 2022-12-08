import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendinviteComponent } from './sendinvite.component';

describe('SendinviteComponent', () => {
  let component: SendinviteComponent;
  let fixture: ComponentFixture<SendinviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendinviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendinviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
