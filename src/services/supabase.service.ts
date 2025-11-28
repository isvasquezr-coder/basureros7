import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContenedorRegistro } from '../models/contenedor-registro.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://zvcndvczqvopfziuiajy.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y25kdmN6cXZvcGZ6aXVpYWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5ODUyOTgsImV4cCI6MjA3OTU2MTI5OH0.pLrxGRxhgl9htMVwMRanCbiBVm30FNAkQrtXH-myJwc';
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async getContainerRecords(): Promise<ContenedorRegistro[]> {
    const { data, error } = await this.supabase
      .from('contenedor_registros')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching data from Supabase:', error);
      throw error;
    }
    
    // Supabase returns an array, but we make sure it's not null.
    return (data as ContenedorRegistro[]) || [];
  }
}