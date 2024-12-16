import { writable } from 'svelte/store';

export const toDay = new Date().getDate();
export const toMonth = new Date().getMonth() + 1;
export const toYear = new Date().getFullYear();

export const pickYear = writable(Number(localStorage.getItem('pickYear')) || toYear);
export const pickMonth = writable(Number(localStorage.getItem('pickMonth')) || toMonth);
export const pickDay = writable(Number(localStorage.getItem('pickDay')) || toDay);

// Sincronização com o localStorage
pickYear.subscribe((value) => localStorage.setItem('pickYear', String(value)));
pickMonth.subscribe((value) => localStorage.setItem('pickMonth', String(value)));
pickDay.subscribe((value) => localStorage.setItem('pickDay', String(value)));

// Função para definir a data
export function setDate(newYear: number, newMonth: number, newDay: number) {
  pickYear.set(newYear);
  pickMonth.set(newMonth);
  pickDay.set(newDay);
}
