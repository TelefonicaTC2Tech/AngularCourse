import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrivialComponent } from './trivial/trivial.component';
import { ContentAttributionComponent } from './content-attribution/content-attribution.component';
import { RegisterReactiveComponent } from './registerForms/register-reactive/register-reactive.component';
import { RegisterTemplateComponent } from './registerForms/register-template/register-template.component';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  { path: '', component: TrivialComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'attributions', component: ContentAttributionComponent },
  { path: 'registerReactive', component: RegisterReactiveComponent },
  { path: 'registerTemplate', component: RegisterTemplateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
