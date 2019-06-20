import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.scss']
})
export class QuestionOptionsComponent implements OnInit {
  @Input()
  answers: string[];

  constructor() { }

  ngOnInit() {
  }

}
