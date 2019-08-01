import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
import { Subject, Observable } from 'rxjs';
import { Component } from '@angular/compiler/src/core';
import { ComponentInstance } from '@angular/core/src/render3/interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private subject: Subject<boolean>;
  public modalData$: Observable<boolean>;

  constructor(private domService: DomService) {}

  open(component: ComponentInstance, inputs: object) {
    this.subject = new Subject<any>();
    this.modalData$ = this.subject.asObservable();
    this.domService.appendComponentTo(component, inputs);
  }

  destroy() {
    this.subject.complete();
    this.domService.removeComponent();
  }

  // the response of the modal
  sendModalData(data: boolean) {
    this.subject.next(data);
  }
}
