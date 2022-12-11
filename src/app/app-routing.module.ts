import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NumberToWordComponent } from './number-to-word/number-to-word.component';
import { TimeComponent } from './time/time.component';

const routes: Route[] = [
  {
    path: 'time',
    component: TimeComponent
  },
  {
    path: 'number-to-word',
    component: NumberToWordComponent
  },
  {
    path: '**',
    redirectTo: 'time',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
