import { Injectable } from '@angular/core';
import { Question } from './question';
import { of, Observable, throwError } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface QuestionResponse {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questionList$: Observable<QuestionResponse[]>;
  lastQuestion = -1;
  serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = 'https://opentdb.com/api.php?amount=50&category=11&difficulty=easy';
  }

  initQuestions() {
    this.questionList$ = this.http
      .get<{result: number; results: QuestionResponse[]}>(this.serverUrl).pipe(
      map(res => res.results),
      shareReplay(1)
      );
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
      map((questions: QuestionResponse[]) => {
        const originalQuestion = questions[this.lastQuestion];
        const answers = [...originalQuestion.incorrect_answers, originalQuestion.correct_answer];
        const question = {...originalQuestion, answers};
        delete question.incorrect_answers;

        return question as Question;
      })
    );
  }
}
