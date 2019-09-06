import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, Input, Output, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { DifficultyObject, Difficulty } from './difficulty';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrivialComponent } from './trivial/trivial.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ModalService } from './modal.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HeaderComponent } from './header/header.component';
describe('AppComponent', () => {
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
        AppComponent,
        TrivialComponent,
        HeaderComponent,
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
});
