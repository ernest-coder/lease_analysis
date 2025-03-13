import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, map, Observable } from 'rxjs';
import { LeaseAnalysis } from '../models/lease-analysis.model';

@Injectable({
  providedIn: 'root'
})
export class LeaseAnalysisService {

  constructor(private supabaseService: SupabaseService) { }

  insertLeaseAnalysisFile(filePath: string): Observable<LeaseAnalysis> {
    const supabase = this.supabaseService.getClient();
    return from(supabase.from('LeaseAnalysis').insert([{ template: null, file: filePath }]).select()).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data[0] as LeaseAnalysis; // Assuming a single record is inserted
      })
    );
  }

  getLeaseAnalysisById(id: number): Observable<LeaseAnalysis> {
    const supabase = this.supabaseService.getClient();
    return from(supabase.from('LeaseAnalysis').select('*').eq('id', id).single()).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data as LeaseAnalysis;
      })
    );
  }

  setTemplateId(leaseAnalysisId: number, templateId: number): Observable<LeaseAnalysis> {
    const supabase = this.supabaseService.getClient();
    return from(
      supabase.from('LeaseAnalysis')
        .update({ template: templateId })
        .eq('id', leaseAnalysisId)
        .select()
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data[0] as LeaseAnalysis; // Assuming a single record is updated
      })
    );
  }
}
