import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { ModalService } from '../modal.service';
import { Difficulty } from '../difficulty';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.component.html',
  styleUrls: ['./trivial.component.scss']
})
export class TrivialComponent implements OnInit, CanComponentDeactivate {
  /* * workaround to force change detection in timer component * */
  // tslint:disable-next-line: ban-types
  isCorrect: Boolean;
  playing = false;
  score = 0;
  finish = false;
  difficulty: Difficulty = 'easy';
  coefficients = { easy: 1, medium: 2, hard: 3 };
  scoreBase = 5;
  freeze = false;

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
      ? this.score + this.scoreBase * this.coefficients[this.difficulty]
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
      message: 'You scored ' + this.score + '. Do you want to share it?'
    };

    this.modalService.open(ConfirmModalComponent, inputs);
    this.modalService.modalData$.subscribe((result: boolean) =>
      this.managePublish(result)
    );
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.playing && !this.finish) {
      this.freeze = true;
      const inputs = {
        title: 'Hey dude',
        message: 'Are your sure you want to leave the game?'
      };
      this.modalService.open(ConfirmModalComponent, inputs);
      return this.modalService.modalData$.pipe(tap(_ => this.freeze = false));
    }
    return true;
  }
}
