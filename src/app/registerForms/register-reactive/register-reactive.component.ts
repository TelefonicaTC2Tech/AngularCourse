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
        name: new FormControl(null),
        email: new FormControl(null),
        password: new FormControl(null),
        repeatPassword: new FormControl(null)
      }, passwordsEqual)
    */

    this.form = builder.group({
      name: null,
      email: null,
      password: null,
      repeatPassword: null
    })
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

