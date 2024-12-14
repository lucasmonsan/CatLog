export enum PunchClockPointType {
  Start = 'start',
  Break = 'break',
  Return = 'return',
  End = 'end',
}

export interface PunchClockPoint {
  time: string; // Formato: HH:mm
  type?: PunchClockPointType; // Tipo de ponto
  image?: Blob; // Foto ou outro arquivo relacionado ao registro (opcional)
}

export interface PunchClockProps {
  id?: string; // Identificador único do registro
  year: number; // Ano do registro
  month: number; // Mês (1 a 12)
  day: number; // Dia do mês (1 a 31, validar para o mês e ano)
  points: PunchClockPoint[]; // Lista de horários do ponto
  notes?: string; // Observações opcionais
  status?: 'pending' | 'approved' | 'rejected'; // Status opcional do registro
}
