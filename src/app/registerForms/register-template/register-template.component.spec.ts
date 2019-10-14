import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTemplateComponent } from './register-template.component';
import { FormsModule } from '@angular/forms';
import { MustMatchDirective } from './mustMatch.directive';

describe('RegisterTemplateComponent', () => {
  let component: RegisterTemplateComponent;
  let fixture: ComponentFixture<RegisterTemplateComponent>;
  let hostElement: HTMLElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTemplateComponent, MustMatchDirective],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the form value when you write', () => {
    // whenStable is needed to work with ngForm and template forms
    fixture.whenStable().then(() => {
      expect(component.user.name).toBe('');
      expect(component.user.email).toBe('');
      expect(component.user.password).toBe('');
      expect(component.user.repeatPassword).toBe('');
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
      expect(component.user.name).toBe("username");
      expect(component.user.email).toBe("email");
      expect(component.user.password).toBe("password");
      expect(component.user.repeatPassword).toBe("password");
    });
  });

  it('should not be able to send the form while its pristine', () => {
    // whenStable is needed to work with ngForm and template forms
    fixture.whenStable().then(() => {
      expect(hostElement.querySelector('#register-btn').classList.contains('disabled')).toBeTruthy();
      const nameField = hostElement.querySelector('#username') as HTMLInputElement
      nameField.value = "username"
      nameField.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(hostElement.querySelector('#register-btn').classList.contains('disabled')).toBeFalsy();
    });
  });
});
