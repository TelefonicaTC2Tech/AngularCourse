import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do a countdown', fakeAsync(() => {
    component.countdown = 3;
    component.isCorrect = null;
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(component.seconds).toBe(2);
    tick(1000);
    fixture.detectChanges();
    expect(component.seconds).toBe(1);
    tick(1000);
    fixture.detectChanges();
    expect(component.seconds).toBe(0);
    tick(1000);
    fixture.detectChanges();
    component.timeout.subscribe(finish => expect(finish).toBe(true));
  }));

  it('should add seconds to countown', fakeAsync(() => {
    component.countdown = 1;
    component.isCorrect = null;
    fixture.detectChanges();
    tick(1000);
    component.isCorrect = true;
    fixture.detectChanges();
    expect(component.seconds).toBe(5);
    discardPeriodicTasks();
  }));

  it('should decrement seconds in countown', fakeAsync(() => {
    component.countdown = 6;
    component.isCorrect = null;
    fixture.detectChanges();
    tick(1000);
    component.isCorrect = false;
    fixture.detectChanges();
    expect(component.seconds).toBe(0);
    discardPeriodicTasks();
  }));
});
