// Define a interface para o modelo de dados
export interface PunchClockProps {
  year: number;  // Ano do registro
  month: number; // Mês do registro
  day: number;   // Dia do registro
  points: string[]; // Lista de horários (Ex.: ['08:00', '12:00', '13:00', '18:00'])
}