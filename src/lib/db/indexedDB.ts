import Dexie, { type Table } from 'dexie';
import type { PunchClockProps } from '$lib/types/punchClock.d';

export class PunchClockDB extends Dexie {
  records!: Table<PunchClockProps, string>; // Tabela de registros com o ID como chave primária

  constructor() {
    super('PunchClockDB');
    this.version(1).stores({
      records: 'id, year, month, day, synced',
    });
  }
}

export const db = new PunchClockDB();

export async function saveRecord(record: PunchClockProps): Promise<void> {
  // Garante que o registro tenha um ID
  if (!record.id) {
    record.id = crypto.randomUUID(); // Gera um UUID para registros novos
  }
  await db.records.put(record); // Salva ou atualiza o registro
}

export async function getRecordByDate(
  year: number,
  month: number,
  day: number
): Promise<PunchClockProps | undefined> {
  return db.records
    .where({ year, month, day })
    .first(); // Retorna o primeiro registro correspondente à data
}

export async function getUnsyncedRecords(): Promise<PunchClockProps[]> {
  return db.records.where('synced').equals(0).toArray();
}

export async function deleteRecord(id: string): Promise<void> {
  await db.records.delete(id);
}
