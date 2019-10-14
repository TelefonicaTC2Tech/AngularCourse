import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReactiveComponent } from './register-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterReactiveComponent', () => {
  let component: RegisterReactiveComponent;
  let fixture: ComponentFixture<RegisterReactiveComponent>;
  let hostElement: HTMLElement
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterReactiveComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the form value when you write', () => {
    expect(component.form.value.name).toBe(null);
    expect(component.form.value.email).toBe(null);
    expect(component.form.value.password).toBe(null);
    expect(component.form.value.repeatPassword).toBe(null);
    const nameField = hostElement.querySelector('#username') as HTMLInputElement
    nameField.value = "username"
    nameField.dispatchEvent(new Event('input'));
    const eamilField = hostElement.querySelector('#email') as HTMLInputElement
    eamilField.value = "email"
    eamilField.dispatchEvent(new Event('input'));
    const passwordField = hostElement.querySelector('#password') as HTMLInputElement
    passwordField.value = "password"
    passwordField.dispatchEvent(new Event('input'));
    const passwordRepField = hostElement.querySelector('#repeatPassword') as HTMLInputElement
    passwordRepField.value = "password"
    passwordRepField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.form.value.name).toBe("username");
    expect(component.form.value.email).toBe("email");
    expect(component.form.value.password).toBe("password");
    expect(component.form.value.repeatPassword).toBe("password");
  });

  it('should not be able to send the form while its pristine', () => {
    expect(component.form.pristine).toBeTruthy();
    expect(hostElement.querySelector('#register-btn').classList.contains('disabled')).toBeTruthy();
    const nameField = hostElement.querySelector('#username') as HTMLInputElement
    nameField.value = "username"
    nameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.form.pristine).toBeFalsy();
    expect(hostElement.querySelector('#register-btn').classList.contains('disabled')).toBeFalsy();
  });

  it('should show errors in name field when neccesary', () => {
    // Name field is mandatory and needs at least 5 characters
    // Errors will not show if the field isnt touched
    expect(hostElement.querySelector('#username-error')).toBeFalsy();
    const nameField = hostElement.querySelector('#username') as HTMLInputElement
    nameField.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#username-error')).toBeTruthy();
    nameField.value = "username"
    nameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#username-error')).toBeFalsy();
    nameField.value = "user"
    nameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#username-error')).toBeTruthy();
    nameField.value = "valid"
    nameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#username-error')).toBeFalsy();
    nameField.value = "verylongusername"
    nameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#username-error')).toBeFalsy();
    nameField.value = ""
    nameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#username-error')).toBeTruthy();

  });
  it('should show errors in email field when neccesary', () => {
    // Email field is mandatory and needs to ve a correct email
    // Errors will not show if the field isnt touched
    expect(hostElement.querySelector('#email-error')).toBeFalsy();
    const emailField = hostElement.querySelector('#email') as HTMLInputElement
    emailField.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#email-error')).toBeTruthy();
    emailField.value = "validemail@valid.es"
    emailField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#email-error')).toBeFalsy();
    emailField.value = "notvalidemail"
    emailField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#email-error')).toBeTruthy();
    emailField.value = "a@a.a"
    emailField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#email-error')).toBeFalsy();
    emailField.value = "verylonguseremail@very.long"
    emailField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#email-error')).toBeFalsy();
    emailField.value = ""
    emailField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#email-error')).toBeTruthy();

  });
  it('should show errors in password field when neccesary', () => {
    // Password field is mandatory and needs at least 5 characters 
    // Errors will not show if the field isnt touched
    expect(hostElement.querySelector('#password-error')).toBeFalsy();
    const passwordField = hostElement.querySelector('#password') as HTMLInputElement
    passwordField.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#password-error')).toBeTruthy();
    passwordField.value = "password"
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#password-error')).toBeFalsy();
    passwordField.value = "pass"
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#password-error')).toBeTruthy();
    passwordField.value = "valid"
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#password-error')).toBeFalsy();
    passwordField.value = "verylongpassword"
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#password-error')).toBeFalsy();
    passwordField.value = ""
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#password-error')).toBeTruthy();
  });

  it('should show errors in repeat password field when neccesary', () => {
    // Repeat Password field must match the password field 
    // Errors will not show if the field isnt touched
    expect(hostElement.querySelector('#password-error')).toBeFalsy();
    const passwordField = hostElement.querySelector('#password') as HTMLInputElement
    const repeatPasswordField = hostElement.querySelector('#repeatPassword') as HTMLInputElement
    repeatPasswordField.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#repeatpassword-error')).toBeTruthy();
    passwordField.value = "password"
    passwordField.dispatchEvent(new Event('input'));
    repeatPasswordField.value = "password"
    repeatPasswordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#repeatpassword-error')).toBeFalsy();
    passwordField.value = "pass"
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#repeatpassword-error')).toBeTruthy();
    passwordField.value = "password"
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#repeatpassword-error')).toBeFalsy();
    repeatPasswordField.value = "randomdifferentpassword"
    repeatPasswordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#repeatpassword-error')).toBeTruthy();
    passwordField.value = "randomdifferentpassword"
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#repeatpassword-error')).toBeFalsy();
  });
});
