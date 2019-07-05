import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Difficulty } from './difficulty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Trivial Game';
  /* * workaround to force change detection in timer component * */
  // tslint:disable-next-line: ban-types
  isCorrect: Boolean;
  playing = false;
  score = 0;
  finish = false;
  difficulty: Difficulty = 'easy';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.questionService.initQuestions(this.difficulty);
  }

  computeResult(isCorrect: boolean) {
    /* * workaround to force change detection in timer component * */
    // tslint:disable-next-line: no-construct
    this.isCorrect = new Boolean(isCorrect);
    /* * end workaround * */
    this.score = isCorrect ? this.score + 5 : this.score;
  }

  stop() {
    this.playing = false;
    this.finish  = true;
  }

  managePublish(publish: boolean) {
    if (publish) {
      console.log('published');
    }
    this.finish = false;
  }
}
