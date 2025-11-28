export interface ContenedorRegistro {
  id: number;
  containerId: string;
  location: { lat?: number; lon?: number } | null;
  timestamp: string;
  fillLevelPercent: number | null;
  levelHigh: number | null;
  levelLow: number | null;
  status: string | null;
  recommendation: string | null;
  eventType: string | null;
  operatorId: string | null;
  notes: string | null;
}
