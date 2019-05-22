import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { QuestionService } from './question.service';
import { Question } from './question';
import { forkJoin } from 'rxjs';

describe('QuestionService', () => {
  let service: QuestionService;
  let httpTestingController: HttpTestingController;

  const questionListMock = [
    {
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question:
        'Which of these colours is NOT featured in the logo for Google?',
      correct_answer: 'Pink',
      incorrect_answers: ['Yellow', 'Blue', 'Green']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question:
        'In 2010, Twitter and the United States Library of Congress partnered together to archive every tweet by American citizens.',
      correct_answer: 'True',
      incorrect_answers: ['False']
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(QuestionService);
    httpTestingController = TestBed.get(HttpTestingController);
    service.initQuestions();
    httpTestingController.expectNone(service.serverUrl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a question', done => {
    service.getQuestion().subscribe((question: Question) => {
      expect(question).toBeDefined();
      expect(question.question).toBeDefined();
      expect(question.incorrect_answers).toBeDefined();
      expect(question.correct_answer).toBeDefined();
      done();
    });
    const reqQuestions = httpTestingController.expectOne(service.serverUrl);
    reqQuestions.flush({ response_code: 0, results: questionListMock });
  });

  it('should return an error', done => {
    service.questionList$ = null; // simulate that initQuestions has not been called
    service.getQuestion().subscribe(
      q => {
        expect(q).toBeUndefined();
      },
      error => {
        expect(error.message).toEqual('oops!');
        done();
      }
    );
    httpTestingController.expectNone(service.serverUrl);
  });

  it('should return a different question in different calls', done => {
    const question$ = service.getQuestion();
    const question2$ = service.getQuestion();
    // https://rxjs-dev.firebaseapp.com/api/index/function/forkJoin
    // https://rxjs-dev.firebaseapp.com/guide/subscription
    forkJoin([question$, question2$]).subscribe(([q, q2]: Question[]) => {
      expect(q2.question).toBeDefined();
      expect(q2.incorrect_answers).toBeDefined();
      expect(q2.correct_answer).toBeDefined();
      expect(q2.question).not.toEqual(q.question);
      done();
    });
    const reqQuestions = httpTestingController.expectOne(service.serverUrl);
    reqQuestions.flush({ response_code: 0, results: questionListMock });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
