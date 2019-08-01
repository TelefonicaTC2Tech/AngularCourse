import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  set inputs(inputs: {
    message: string;
    buttonAcceptText: string;
    buttonCloseText: string
  }) {
    this.message = inputs.message;
    this.buttonAcceptText = inputs.buttonAcceptText;
    this.buttonCloseText = inputs.buttonCloseText;
  }
  message: string;
  buttonAcceptText: string;
  buttonCloseText: string;

  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  close(data: boolean) {
    this.modalService.sendModalData(data);
  }
}
