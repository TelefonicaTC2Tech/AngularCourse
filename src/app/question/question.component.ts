import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Question } from '../question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: Question;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.question = this.questionService.getQuestion();
  }

}
