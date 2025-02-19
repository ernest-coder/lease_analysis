import { Injectable } from '@angular/core';
import { Question } from '../models/question.models';
import { from, map, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private supabaseService: SupabaseService) { }

  getAllQuestions() : Observable<Question[]> {
    return from(this.supabaseService.getClient().from('Question').select('*')).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      })
    );
  }

  getQuestionsByIds(questionIds: number[]): Observable<Question[]> {
    return from(this.supabaseService.getClient().from('Question').select('*').in('id', questionIds)).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      })
    );
  }
}
