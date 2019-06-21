import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionService } from '../question.service';
import { Question } from '../question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: Question;
  @Output()
  isCorrect = new EventEmitter<boolean>();
  showResult: boolean;
  resultMsgTimer;
  result: 'correct!' | 'incorrect!';

  constructor(private questionService: QuestionService) {}

  private getNewQuestion() {
    this.questionService
    .getQuestion()
    .subscribe(
      q => (this.question = q),
      _ => console.log('not available question')
    );
  }

  ngOnInit() {
    this.getNewQuestion();
  }

  check(response: string) {
    if (this.resultMsgTimer) {
      clearTimeout(this.resultMsgTimer);
    }
    const isCorrect = response === this.question.correct_answer;
    this.result = (isCorrect) ? 'correct!' : 'incorrect!';
    this.isCorrect.emit(isCorrect);
    this.showResult = true;
    this.resultMsgTimer = setTimeout(_ => { this.showResult = false; this.getNewQuestion(); }, 1000);
  }
}
