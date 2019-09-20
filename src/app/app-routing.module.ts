import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrivialComponent } from './trivial/trivial.component';

const routes: Routes = [
  { path: '', component: TrivialComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
