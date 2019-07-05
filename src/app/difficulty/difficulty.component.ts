import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Difficulty } from '../difficulty';
;

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss']
})
export class DifficultyComponent implements OnInit {

  @Input()
  range: Difficulty[];
  @Input()
  difficulty: Difficulty;
  @Output()
  difficultyChange = new EventEmitter<Difficulty>(); // Mind the name xxxChanged

  constructor() { }

  changeDifficulty(index: number) {
    this.difficultyChange.emit(this.range[index]);
  }

  ngOnInit() {
  }

}
