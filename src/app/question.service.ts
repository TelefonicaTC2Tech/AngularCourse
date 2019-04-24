import { Injectable } from '@angular/core';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questionList: Question[];
  lastQuestion = -1;

  constructor() {}

  initQuestions() {
    this.questionList = [
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'Which of these colours is NOT featured in the logo for Google?',
        correct_answer: 'Pink',
        incorrect_answers: ['Yellow', 'Blue', 'Green']
      },
      {
        category: 'General Knowledge',
        type: 'boolean',
        difficulty: 'easy',
        question:
          'In 2010, Twitter and the United States Library of Congress partnered together to archive every tweet by American citizens.',
        correct_answer: 'True',
        incorrect_answers: ['False']
      }
    ];
  }

  getQuestion(): Question {
    if (this.questionList) {
      this.lastQuestion = (this.lastQuestion + 1) % this.questionList.length;
      return this.questionList[this.lastQuestion];
    }
  }
}
