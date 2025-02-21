import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { TemplatePageComponent } from './features/template/template-page/template-page.component';
import { QuestionListComponent } from './features/question/question-list/question-list.component';
import { AnalyzePageComponent } from './features/analyze/analyze-page/analyze-page.component';

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
  {
    path: 'analyze',
    component: AnalyzePageComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
