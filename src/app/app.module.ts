import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionOptionsComponent } from './question-options/question-options.component';
import { TimerComponent } from './timer/timer.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { DifficultyComponent } from './difficulty/difficulty.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionOptionsComponent,
    TimerComponent,
    ConfirmModalComponent,
    DifficultyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  entryComponents: [ConfirmModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
