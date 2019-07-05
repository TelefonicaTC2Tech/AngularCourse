import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA, Input, Output, EventEmitter, Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  // mocks
  @Component({selector: 'app-question', template: ''})
  class QuestionStubComponent {
    @Input()
    question = {};
    @Output()
    isCorrect = new EventEmitter<string>();
  }

  @Component({selector: 'app-timer', template: ''})
  class TimerStubComponent {
    @Output()
    timeout = new EventEmitter<boolean>();
  }

  @Component({selector: 'app-confirm-modal', template: ''})
  class ModalStubComponent {
    @Output()
    modalData = new EventEmitter<boolean>();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        QuestionStubComponent,
        TimerStubComponent,
        ModalStubComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Trivial Game'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Trivial Game');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Trivial Game!');
  });

  it('should start the game', () => {
    const fixture = TestBed.createComponent(AppComponent);
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
    const fixture = TestBed.createComponent(AppComponent);
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
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.playing = true;
    fixture.detectChanges();

    const questionComponent = fixture.debugElement.query(By.directive(QuestionStubComponent)).componentInstance;
    questionComponent.isCorrect.emit(false);
    fixture.detectChanges();
    expect(app.score).toBe(0);

    questionComponent.isCorrect.emit(true);
    fixture.detectChanges();
    expect(app.score).toBe(5);
  });

  it('should stop the game', () => {
    const fixture = TestBed.createComponent(AppComponent);
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
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.finish = true;
    fixture.detectChanges();
    const modalComponent = fixture.debugElement.query(By.directive(ModalStubComponent)).componentInstance;
    modalComponent.modalData.emit(true);
    fixture.detectChanges();
    expect(app.finish).toBe(false);
  });
});
