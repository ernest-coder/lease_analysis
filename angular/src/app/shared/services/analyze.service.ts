import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaseAnalysis } from '../models/lease-analysis.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyzeService {

  constructor(
    private http: HttpClient
  ) { }

  analyzeLease(leaseAnalysis: LeaseAnalysis): Observable<LeaseAnalysis> {
    return this.http.post<LeaseAnalysis>(`/api/analyze`, leaseAnalysis);
  }
}
