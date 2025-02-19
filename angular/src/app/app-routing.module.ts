import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { TemplatePageComponent } from './features/template/template-page/template-page.component';
import { QuestionListComponent } from './features/question/question-list/question-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'templates',
    component: TemplatePageComponent
  },
  {
    path: 'questions',
    component: QuestionListComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
