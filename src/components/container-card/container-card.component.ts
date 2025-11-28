import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenedorRegistro } from '../../models/contenedor-registro.model';

@Component({
  selector: 'app-container-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerCardComponent {
  record = input.required<ContenedorRegistro>();

  fillPercentage = computed(() => this.record().fillLevelPercent ?? 0);

  fillColorClass = computed(() => {
    const percentage = this.fillPercentage();
    if (percentage > 85) return 'bg-red-500';
    if (percentage > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  });

  statusColorClass = computed(() => {
    const status = this.record().status?.toLowerCase();
    switch (status) {
        case 'ok':
            return 'bg-green-600 text-green-100';
        case 'alerta':
        case 'lleno':
            return 'bg-red-600 text-red-100';
        case 'mantenimiento':
            return 'bg-yellow-600 text-yellow-100';
        default:
            return 'bg-slate-600 text-slate-100';
    }
  });

  formattedTimestamp = computed(() => {
    const timestamp = this.record().timestamp;
    if (!timestamp) return 'No disponible';
    try {
      return new Date(timestamp).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Fecha inválida';
    }
  });

}
