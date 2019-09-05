import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, Input, Output, EventEmitter, Component, ApplicationRef } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Difficulty, DifficultyObject } from '../difficulty';
import { TrivialComponent } from './trivial.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ModalService } from '../modal.service';

describe('TrivialComponent', () => {

  // mocks
  @Component({ selector: 'app-question', template: '' })
  class QuestionStubComponent {
    @Input()
    question = {};
    @Output()
    isCorrect = new EventEmitter<string>();
  }

  @Component({ selector: 'app-timer', template: '' })
  class TimerStubComponent {
    @Output()
    timeout = new EventEmitter<boolean>();
  }

  @Component({ selector: 'app-difficulty', template: '' })
  class DifficultyStubComponent {
    @Input()
    range: DifficultyObject[];
    @Input()
    difficulty: Difficulty;
    @Output()
    difficultyChange = new EventEmitter<Difficulty>();
  }

  beforeEach(async(() => {
    // configure BrowserDynamicTestingModule and override it with entrycomponents
    // array because it doesn't implmement it.
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        TrivialComponent,
        QuestionStubComponent,
        TimerStubComponent,
        ConfirmModalComponent,
        DifficultyStubComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ModalService]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ConfirmModalComponent],
      }
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TrivialComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should start the game', () => {
    const fixture = TestBed.createComponent(TrivialComponent);
    const app = fixture.debugElement.componentInstance;
    app.playing = false;
    fixture.detectChanges();
    let questionElement = fixture.debugElement.query(By.directive(QuestionStubComponent));
    expect(questionElement).toBeNull();
    const start = fixture.debugElement.query(By.css('#trivial-start')).nativeElement;
    start.click();
    fixture.detectChanges();
    questionElement = fixture.debugElement.query(By.directive(QuestionStubComponent));
    expect(questionElement).toBeTruthy();
  });

  it('should register an answer', () => {
    const fixture = TestBed.createComponent(TrivialComponent);
    const app = fixture.debugElement.componentInstance;
    app.playing = true;
    fixture.detectChanges();

    const questionComponent = fixture.debugElement.query(By.directive(QuestionStubComponent)).componentInstance;
    questionComponent.isCorrect.emit(true);
    fixture.detectChanges();
    expect(app.isCorrect).toEqual(true);

    questionComponent.isCorrect.emit(false);
    fixture.detectChanges();
    expect(app.isCorrect).toEqual(false);
  });

  it('should compute the score', () => {
    const fixture = TestBed.createComponent(TrivialComponent);
    const app = fixture.debugElement.componentInstance;
    app.playing = true;
    fixture.detectChanges();

    const questionComponent = fixture.debugElement.query(By.directive(QuestionStubComponent)).componentInstance;
    questionComponent.isCorrect.emit(false);
    fixture.detectChanges();
    expect(app.score).toBe(0);

    questionComponent.isCorrect.emit(true);
    fixture.detectChanges();
    expect(app.score).toBe(app.coefficients.easy * app.scoreBase);
  });

  it('should compute the score changing difficulty', () => {
    const fixture = TestBed.createComponent(TrivialComponent);
    const app = fixture.debugElement.componentInstance;
    app.playing = true;
    fixture.detectChanges();

    const questionComponent = fixture.debugElement.query(By.directive(QuestionStubComponent)).componentInstance;
    questionComponent.isCorrect.emit(true);
    fixture.detectChanges();
    expect(app.score).toBe(app.coefficients.easy * app.scoreBase);

    app.difficulty = 'medium';
    fixture.detectChanges();
    questionComponent.isCorrect.emit(true);
    fixture.detectChanges();
    expect(app.score).toBe(app.coefficients.easy * app.scoreBase + app.coefficients.medium * app.scoreBase);

    app.difficulty = 'hard';
    fixture.detectChanges();
    questionComponent.isCorrect.emit(true);
    fixture.detectChanges();
    expect(app.score).toBe(app.coefficients.easy * app.scoreBase + app.coefficients.medium * app.scoreBase + app.coefficients.hard * app.scoreBase);
  });

  it('should stop the game', () => {
    const fixture = TestBed.createComponent(TrivialComponent);
    const app = fixture.debugElement.componentInstance;
    app.playing = true;
    fixture.detectChanges();
    const timerComponent = fixture.debugElement.query(By.directive(TimerStubComponent)).componentInstance;
    timerComponent.timeout.emit(true);
    fixture.detectChanges();
    expect(app.finish).toBe(true);
    expect(app.playing).toBe(false);
  });

  it('should show modal and publish the score', () => {
    // Disclaimer: this is not a unit test. It is not mocking ModalService nor ModalComponent.
    const fixture = TestBed.createComponent(TrivialComponent);
    const app = fixture.debugElement.componentInstance;
    // ApplicationRef is a reference to the Angular app. In testbed, the AppComponent has not been bootstrapped
    // so we have to push it manually to let domService to use it to insert the dynamic component.
    TestBed.get(ApplicationRef).components.push(fixture.componentRef);

    app.stop();
    fixture.detectChanges();
    const closeBtn = fixture.nativeElement.querySelector('app-confirm-modal #close-button');
    closeBtn.click();
    fixture.detectChanges();
    expect(app.finish).toBe(false);
  });

  it('should show the difficulty', () => {
    const fixture = TestBed.createComponent(TrivialComponent);
    const app = fixture.debugElement.componentInstance;
    app.playing = false;
    app.finish = false;
    fixture.detectChanges();
    const difficultyComponent = fixture.debugElement.query(By.directive(DifficultyStubComponent)).componentInstance;
    expect(difficultyComponent.difficulty).toBe('easy');
    difficultyComponent.difficultyChange.emit('hard');
    fixture.detectChanges();
    expect(app.difficulty).toEqual('hard');
  });
});
