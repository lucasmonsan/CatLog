import { writable } from 'svelte/store';

export const toDay = new Date().getDate();
export const toMonth = new Date().getMonth() + 1;
export const toYear = new Date().getFullYear();

export const pickYear = writable(toYear);
export const pickMonth = writable(toMonth);
export const pickDay = writable(toDay);

export function setDate(newYear: number, newMonth: number, newDay: number) {
  pickYear.set(newYear);
  pickMonth.set(newMonth);
  pickDay.set(newDay);
}
