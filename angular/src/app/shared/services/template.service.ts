import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Template } from '../models/template.models';
import { from, map, Observable, switchMap } from 'rxjs';
import { QuestionService } from './question.service';
import { Question } from '../models/question.models';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private supabaseService: SupabaseService,
    private questionService: QuestionService) { }

    getAllTemplates() : Observable<Template[]> {
      return from(this.supabaseService.getClient().from('Template').select('*')).pipe(
        map(response => {
          if (response.error) {
            throw response.error;
          }
          return response.data;
        })
      );
    }

    getQuestionIdsByTemplateId(templateId: number): Observable<number[]> {
      return from(this.supabaseService.getClient().from('QuestionsTemplates').select('question_id').eq('template_id', templateId)).pipe(
        map(response => {
          if (response.error) {
            throw response.error;
          }
          return response.data.map(item => item.question_id);
        })
      );
    }

    getQuestionsByTemplateId(templateId: number): Observable<Question[]> {
      return this.getQuestionIdsByTemplateId(templateId).pipe(
        switchMap(questionIds => this.questionService.getQuestionsByIds(questionIds))
      );
    }
}
