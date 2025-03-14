import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private supabaseService: SupabaseService) { }

  generateSignedUrl(bucketName: string, filePath: string): Observable<string> {
    const supabase = this.supabaseService.getClient();
    const oneWeekInSeconds = 60 * 60 * 24 * 7; // One week in seconds

    return from(supabase.storage.from(bucketName).createSignedUrl(filePath, oneWeekInSeconds)).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data.signedUrl;
      })
    );
  }

}
