import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { QuestionService } from '../question.service';
import { Question } from '../question';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, Component, Output, EventEmitter, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let optionsComponent: QuestionOptionsStubComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let questionEl: HTMLElement;

  // mocks
  const questionMultiple = {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Which of these colours is NOT featured in the logo for &quot;Google?&quot;',
    correct_answer: 'Pink',
    answers: ['Yellow', 'Blue', 'Pink', 'Green']
  } as Question;
  const questionServiceSpy = jasmine.createSpyObj('QuestionService', ['getQuestion']);

  @Component({ selector: 'app-question-options', template: '' })
  class QuestionOptionsStubComponent {
    @Input()
    answers: string[] = [];
    @Output()
    selected = new EventEmitter<string>();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionComponent, QuestionOptionsStubComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: QuestionService, useValue: questionServiceSpy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    questionServiceSpy.getQuestion.and.returnValue(of(questionMultiple));
    fixture.detectChanges(); // onInit()

    expect(component).toBeTruthy();
  });
  it('should show a question', () => {
    const expectedQuestion = 'Which of these colours is NOT featured in the logo for "Google?"';
    const getQuestionSpy = questionServiceSpy.getQuestion.and.returnValue(of(questionMultiple));
    fixture.detectChanges(); // onInit()

    questionEl = fixture.nativeElement.querySelector('.question');
    // sync spy result shows question immediately after init
    expect(questionEl.textContent).toBe(expectedQuestion);
    expect(getQuestionSpy.calls.any()).toBe(true, 'getQuestion called');
  });

  it('should register an incorrect answer', () => {
    fixture.detectChanges(); // onInit()
    optionsComponent = fixture.debugElement.query(By.directive(QuestionOptionsStubComponent)).componentInstance;


    component.isCorrect.subscribe(isCorrect => expect(isCorrect).toBe(false));
    optionsComponent.selected.emit('Yellow');
    fixture.detectChanges();
  });

  it('should register a correct answer', () => {
    fixture.detectChanges(); // onInit()
    optionsComponent = fixture.debugElement.query(By.directive(QuestionOptionsStubComponent)).componentInstance;
    component.isCorrect.subscribe(isCorrect => expect(isCorrect).toBe(true));
    optionsComponent.selected.emit('Pink');
    fixture.detectChanges();
  });
});
