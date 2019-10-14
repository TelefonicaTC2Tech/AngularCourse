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
});
