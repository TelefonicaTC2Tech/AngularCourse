import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input()
  // tslint:disable-next-line: ban-types
  set isCorrect(isCorrect: Boolean) {
    if (!isNaN(this.seconds)) {
      this.seconds = isCorrect.valueOf() ? this.seconds + 5 : this.seconds - 5;
      if (this.seconds < 0) {
        this.seconds = 0;
      }
    }
  }
  @Input()
  countdown = 30;
  @Output()
  timeout = new EventEmitter<boolean>();
  seconds: number;

  private intervalSubscription: Subscription;

  constructor() {}

  private decrement = () => {
    if (this.seconds === 0) {
      this.timeout.emit(true);
      this.intervalSubscription.unsubscribe();
    } else {
      this.seconds = this.seconds - 1;
    }
  }

  ngOnInit() {
    this.seconds = this.countdown;
    this.intervalSubscription = interval(1000).subscribe(this.decrement);
  }
}
