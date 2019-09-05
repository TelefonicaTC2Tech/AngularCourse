import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Difficulty, DifficultyObject } from '../difficulty';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss']
})
export class DifficultyComponent implements OnInit {

  @Input()
  range: DifficultyObject[];
  @Input()
  difficulty: Difficulty;
  @Output()
  difficultyChange = new EventEmitter<Difficulty>(); // Mind the name xxxChanged

  constructor() { }

  changeDifficulty(diff: Difficulty) {
    this.difficultyChange.emit(diff);
  }

  ngOnInit() {
  }

}
