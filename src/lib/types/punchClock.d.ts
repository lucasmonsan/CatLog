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
  id?: string; // Identificador único (local ou do AppWrite)
  year: number; // Ano do registro
  month: number; // Mês (1 a 12)
  day: number; // Dia do mês (1 a 31)
  points: PunchClockPoint[]; // Lista de horários do ponto
  notes?: string; // Observações opcionais
  status?: 'pending' | 'approved' | 'rejected'; // Status opcional do registro
  synced?: boolean; // Indica se o registro foi sincronizado com o AppWrite (vai ser convertido para número ao salvar)
}

export function isValidTime(time: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time); // Valida o formato HH:mm
}
