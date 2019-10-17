import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { markFormGroupTouched } from '../markTouched';
import { fieldsEqual } from './fieldsEqual';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.scss']
})
export class RegisterReactiveComponent {
  form: FormGroup;
  constructor(builder: FormBuilder) {
    // This way of doing it is harder to keep track of, better use FormBuilder
    /*
      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        repeatPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        termsAndConditions: new FormControl(false, [Validators.requiredTrue])
      }, fieldsEqual('password', 'repeatPassword', 'passwordsMatch'))
    */

    this.form = builder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      repeatPassword: [null, [Validators.required, Validators.minLength(5)]],
      termsAndConditions: [false, [Validators.requiredTrue]]
    }, { validators: fieldsEqual('password', 'repeatPassword', 'passwordsMatch') })
  }

  register() {
    // TODO: Send request to backend creating user
    if (this.form.valid) {
      console.log(this.form.value)
    } else {
      markFormGroupTouched(this.form)
    }
  }
}

