import { Component, OnInit } from '@angular/core';
import { markFormGroupTouched } from '../markTouched';

@Component({
  selector: 'app-register-template',
  templateUrl: './register-template.component.html',
  styleUrls: ['./register-template.component.scss']
})
export class RegisterTemplateComponent {
  console = console
  user = {
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  }
  constructor() { }

  register(form) {
    // TODO: Send request to backend creating user
    if (form.valid) {
      console.log(this.user)
    } else {
      markFormGroupTouched(form)
    }
  }
}