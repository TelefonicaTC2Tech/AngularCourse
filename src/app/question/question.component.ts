import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionService } from '../question.service';
import { Question } from '../question';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  correctAnswer: string;
  question$: Observable<Question>;
  @Output()
  isCorrect = new EventEmitter<boolean>();
  showResult: boolean;
  resultMsgTimer;
  result: 'correct!' | 'incorrect!';

  constructor(private questionService: QuestionService) {}

  private getNewQuestion() {
    this.question$ = this.questionService.getQuestion().pipe(
      tap(q => (this.correctAnswer = q.correct_answer)),
      catchError(_ => {
        console.log('not available question');
        return EMPTY;
      })
    );
  }

  ngOnInit() {
    this.getNewQuestion();
  }

  check(response: string) {
    if (this.resultMsgTimer) {
      clearTimeout(this.resultMsgTimer);
    }
    const isCorrect = response === this.correctAnswer;
    this.result = isCorrect ? 'correct!' : 'incorrect!';
    this.isCorrect.emit(isCorrect);
    this.showResult = true;
    this.resultMsgTimer = setTimeout(_ => {
      this.showResult = false;
      this.getNewQuestion();
    }, 1000);
  }
}
