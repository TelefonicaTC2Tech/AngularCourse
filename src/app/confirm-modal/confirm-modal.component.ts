import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input()
  message: string;
  @Input()
  buttonAcceptText: string;
  @Input()
  buttonCloseText: string;

  @Output()
  modalData = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  close(data: boolean) {
    this.modalData.emit(data);
  }
}
