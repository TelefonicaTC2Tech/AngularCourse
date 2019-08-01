import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Difficulty } from './difficulty';
import { ModalService } from './modal.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

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
  private coefficients = { easy: 1, medium: 2, hard: 3 };

  constructor(
    private questionService: QuestionService,
    private modalService: ModalService
  ) {}

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
    this.score = isCorrect
      ? this.score + 5 * this.coefficients[this.difficulty]
      : this.score;
  }

  stop() {
    this.playing = false;
    this.finish = true;
    this.showModalResult();
  }

  managePublish(publish: boolean) {
    if (publish) {
      console.log('published');
    }
    this.finish = false;
  }

  initNewQuestionList(difficulty: Difficulty) {
    this.questionService.initQuestions(difficulty);
  }

  private showModalResult() {
    const inputs = {
      message: 'SCORE: ' + this.score + '. Do you want to share it?'
    };

    this.modalService.open(ConfirmModalComponent, inputs);
    this.modalService.modalData$.subscribe((result: boolean) =>
      this.managePublish(result)
    );
  }
}
