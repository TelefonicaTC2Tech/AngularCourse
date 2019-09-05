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
export class AppComponent {
  title = 'Trivial Game';
}
