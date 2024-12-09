import Dexie from 'dexie';
import type { PunchClockProps } from './types';

// Cria a classe do banco de dados
class PunchClockDB extends Dexie {
  punchClocks!: Dexie.Table<PunchClockProps, number>; // Define a tabela e a chave primária

  constructor() {
    super('PunchClockDB');
    this.version(1).stores({
      punchClocks: '&year,&month,&day' // Índice único baseado na combinação dos três campos
    });
  }
}

// Exporta uma instância do banco de dados
export const db = new PunchClockDB();

export async function savePunchClock(year: number, month: number, day: number, points: string[]) {
  console.log('Salvando no IndexedDB:', { year, month, day, points });
  try {
    await db.punchClocks.put({ year, month, day, points }); // Atualiza ou cria automaticamente
  } catch (error) {
    console.error('Erro ao salvar no IndexedDB:', error);
  }
}

export async function loadPunchClock(year: number, month: number, day: number): Promise<string[]> {
  try {
    const record = await db.punchClocks.where({ year, month, day }).first();
    return record?.points || ['', '', '', ''];
  } catch (error) {
    console.error('Erro ao carregar pontos:', error);
    return ['', '', '', '']; // Retorna lista vazia em caso de erro
  }
}
