import { writable } from "svelte/store";

export const toDay = new Date().getDate()
export const toMonth = new Date().getMonth() + 1
export const toYear = new Date().getFullYear()

export const pickYear = writable(new Date().getFullYear());
export const pickMonth = writable(new Date().getMonth() + 1);
export const pickDay = writable(new Date().getDate());

// Função para definir a data (opcional para facilitar atualizações)
export function setDate(newYear: number, newMonth: number, newDay: number) {
  pickYear.set(newYear);
  pickMonth.set(newMonth);
  pickDay.set(newDay);
}

// Função para resetar a data para hoje
export function resetToToday() {
  pickYear.set(toYear);
  pickMonth.set(toMonth);
  pickDay.set(toDay);
}