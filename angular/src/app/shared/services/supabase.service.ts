import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl: string = environment.supabaseUrl;
  private supabaseKey: string = environment.supabaseKey;
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

}
