import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReactiveComponent } from './register-reactive.component';

describe('RegisterReactiveComponent', () => {
  let component: RegisterReactiveComponent;
  let fixture: ComponentFixture<RegisterReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
