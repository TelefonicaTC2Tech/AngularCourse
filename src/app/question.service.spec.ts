import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { Question } from './question';

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

  it('should return a question', () => {
    const question = service.getQuestion() as Question;
    expect(question).toBeDefined();
    expect(question.question).toBeDefined();
    expect(question.incorrect_answers).toBeDefined();
    expect(question.correct_answer).toBeDefined();
  });

  it('should return a different question in subsequent calls', () => {
    const question = service.getQuestion() as Question;
    const question2 = service.getQuestion() as Question;
    expect(question2.question).toBeDefined();
    expect(question2.incorrect_answers).toBeDefined();
    expect(question2.correct_answer).toBeDefined();
    expect(question2.question).not.toEqual(question.question);

  });
});
