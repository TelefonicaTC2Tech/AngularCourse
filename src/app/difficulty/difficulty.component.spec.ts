import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyComponent } from './difficulty.component';

describe('DifficultyComponent', () => {
  let component: DifficultyComponent;
  let fixture: ComponentFixture<DifficultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DifficultyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the difficulty', () => {
    component.range = [{ key: 'easy', value: 'Easy', color: 'btn-primary' },
    { key: 'medium', value: 'Medium', color: 'btn-warning' },
    { key: 'hard', value: 'Hard', color: 'btn-cancel' }];
    fixture.detectChanges();
    const difficultyHard = fixture.nativeElement.querySelector('#change_difficulty_hard');
    component.difficultyChange.subscribe(value => expect(value).toBe('hard'));
    difficultyHard.click();
    fixture.detectChanges();
  });

});
