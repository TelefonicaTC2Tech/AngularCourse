import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.scss']
})
export class QuestionOptionsComponent implements OnInit {
  @Input()
  set answers(anwsers: string[]) {
    this.clicked = undefined;
    this._anwsers = anwsers;
  }

  @Output()
  selected = new EventEmitter<string>();
  @Input()
  result: string;
  clicked: string;
  _anwsers: string[];

  constructor() { }

  ngOnInit() { }

  onClick(answer: string) {
    if (!this.clicked) {
      this.clicked = answer;
      this.selected.emit(answer);
    }
  }

}
