import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOptionsComponent } from './question-options.component';

describe('QuestionOptionsComponent', () => {
  let component: QuestionOptionsComponent;
  let fixture: ComponentFixture<QuestionOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionOptionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.answers = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show 4 options', () => {
    component.answers = ['a', 'b', 'c', 'd'];
    fixture.detectChanges();
    const options = fixture.nativeElement.querySelectorAll('.option');
    expect(options.length).toBe(4);
  });
});
