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
import { TrivialComponent } from './trivial/trivial.component';
import { HeaderComponent } from './header/header.component';
import { ContentAttributionComponent } from './content-attribution/content-attribution.component';
import { RegisterReactiveComponent } from './registerForms/register-reactive/register-reactive.component';
import { RegisterTemplateComponent } from './registerForms/register-template/register-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MustMatchDirective } from './registerForms/register-template/mustMatch.directive';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionOptionsComponent,
    TimerComponent,
    ConfirmModalComponent,
    DifficultyComponent,
    TrivialComponent,
    HeaderComponent,
    ContentAttributionComponent,
    TrivialComponent,
    RegisterReactiveComponent,
    RegisterTemplateComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  entryComponents: [ConfirmModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
