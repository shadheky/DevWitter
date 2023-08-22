import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginScrenComponent } from './login-scren.component';

describe('LoginScrenComponent', () => {
  let component: LoginScrenComponent;
  let fixture: ComponentFixture<LoginScrenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginScrenComponent]
    });
    fixture = TestBed.createComponent(LoginScrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
