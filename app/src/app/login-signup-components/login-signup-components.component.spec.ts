import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupComponentsComponent } from './login-signup-components.component';

describe('LoginSignupComponentsComponent', () => {
  let component: LoginSignupComponentsComponent;
  let fixture: ComponentFixture<LoginSignupComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSignupComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSignupComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
