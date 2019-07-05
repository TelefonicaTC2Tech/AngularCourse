import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyComponent } from './difficulty.component';

describe('DifficultyComponent', () => {
  let component: DifficultyComponent;
  let fixture: ComponentFixture<DifficultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifficultyComponent ]
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
    component.range = ['easy', 'medium', 'hard'];
    fixture.detectChanges();
    const difficulty = fixture.nativeElement.querySelector('.difficulty-slider input');
    component.difficultyChange.subscribe(value => expect(value).toBe('hard'));
    difficulty.value = 2;
    difficulty.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  });

});
