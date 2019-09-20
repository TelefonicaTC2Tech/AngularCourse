import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrivialComponent } from './trivial/trivial.component';
import { ContentAttributionComponent } from './content-attribution/content-attribution.component';

const routes: Routes = [
  { path: '', component: TrivialComponent },
  { path: 'attributions', component: ContentAttributionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
