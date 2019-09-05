import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.scss']
})
export class QuestionOptionsComponent implements OnInit {
  @Input()
  set answers(answers: string[]) {
    this.clicked = undefined;
    this.answerList = answers;
  }

  @Output()
  selected = new EventEmitter<string>();
  @Input()
  result: string;
  clicked: string;
  answerList: string[];

  constructor() { }

  ngOnInit() { }

  onClick(answer: string) {
    if (!this.clicked) {
      this.clicked = answer;
      this.selected.emit(answer);
    }
  }

}
