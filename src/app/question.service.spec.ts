import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { Question } from './question';
import { forkJoin } from 'rxjs';

describe('QuestionService', () => {
  let service: QuestionService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(QuestionService);
    service.initQuestions();
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
  });
});
