import { Injectable } from '@angular/core';
import { Question } from './question';
import { of, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questionList$: Observable<Question[]>;
  lastQuestion = -1;

  constructor() {}

  initQuestions() {
    this.questionList$ = of([
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'Which of these colours is NOT featured in the logo for Google?',
        correct_answer: 'Pink',
        incorrect_answers: ['Yellow', 'Blue', 'Green']
      } as Question,
      {
        category: 'General Knowledge',
        type: 'boolean',
        difficulty: 'easy',
        question:
          'In 2010, Twitter and the United States Library of Congress partnered together to archive every tweet by American citizens.',
        correct_answer: 'True',
        incorrect_answers: ['False']
      } as Question
    ]);
  }

  getQuestion(): Observable<Question> {
    if (!this.questionList$) {
      return throwError(new Error('oops!'));
    }
    // https://rxjs-dev.firebaseapp.com/guide/operators
    // https://rxjs-dev.firebaseapp.com/operator-decision-tree
    return this.questionList$.pipe(
      tap(
        questions =>
          (this.lastQuestion = (this.lastQuestion + 1) % questions.length)
      ),
      map(questions => {
        return questions[this.lastQuestion];
      })
    );
  }
}
