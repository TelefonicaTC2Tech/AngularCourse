import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOptionsComponent } from './question-options.component';

describe('QuestionOptionsComponent', () => {
  let component: QuestionOptionsComponent;
  let fixture: ComponentFixture<QuestionOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionOptionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.answers = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
