import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.scss']
})
export class QuestionOptionsComponent implements OnInit {
  @Input()
  answers: string[];

  @Output()
  selected = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }
  onClick(answer: string) {
    this.selected.emit(answer);
  }

}
