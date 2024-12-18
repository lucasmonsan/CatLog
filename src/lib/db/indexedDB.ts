import Dexie from 'dexie';
import type { PunchClockProps } from '$lib/types/punchClock';

class PunchClockDatabase extends Dexie {
  punchClock: Dexie.Table<PunchClockProps, string>;

  constructor() {
    super('PunchClockDB');
    this.version(1).stores({
      punchClock: '&id, year, month, day, synced', // Índices
    });
    this.punchClock = this.table('punchClock');
  }
}

export const db = new PunchClockDatabase();

export async function savePunchClock(record: PunchClockProps): Promise<void> {
  if (!record.id) record.id = String(record.year + '-' + record.month + '-' + record.day); // Gera um ID único com base nas datas
  if (!record.notes) record.notes = ''; // Valor padrão para notes
  record.synced = false; // Valor padrão para synced

  await db.punchClock.put(record); // Atualiza se o ID já existir, senão insere
}

export async function getPunchClock(year: number, month: number, day: number): Promise<PunchClockProps | undefined> { // Buscar um registro específico
  return await db.punchClock
    .where({ year, month, day })
    .first(); // Retorna o primeiro registro que bate com os critérios
}

export function createEmptyPunchClock(year: number, month: number, day: number): PunchClockProps { // Criar um registro vazio
  return {
    year,
    month,
    day,
    points: [], // Nenhum ponto registrado
    synced: false, // Não sincronizado
  };
}
