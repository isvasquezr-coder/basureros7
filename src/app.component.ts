import { Component, ChangeDetectionStrategy, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from './services/supabase.service';
import { ContenedorRegistro } from './models/contenedor-registro.model';
import { ContainerCardComponent } from './components/container-card/container-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ContainerCardComponent],
})
export class AppComponent implements OnInit {
  private supabaseService = inject(SupabaseService);

  records = signal<ContenedorRegistro[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.supabaseService.getContainerRecords();
      this.records.set(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      this.error.set(`Failed to fetch data: ${errorMessage}`);
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
