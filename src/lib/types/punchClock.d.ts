export enum PunchClockPointType {
  Start = 'start',
  Break = 'break',
  Return = 'return',
  End = 'end',
}

export interface PunchClockPoint {
  time: string; // Formato: HH:mm
  type?: PunchClockPointType; // Tipo de ponto
  image?: Blob | undefined; // Foto ou outro arquivo relacionado ao registro (opcional)
}

export interface PunchClockProps {
  id?: string; // Identificador único (local ou do AppWrite)
  year: number;
  month: number;
  day: number;
  points: Point[];
  notes?: string; // Opcional, mas pode ser definido
  synced?: boolean; // Obrigatório
}

export function isValidTime(time: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time); // Valida o formato HH:mm
}
