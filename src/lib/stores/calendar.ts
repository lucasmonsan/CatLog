import { writable } from 'svelte/store'

export const pickDay = writable(new Date().getDate())
export const pickMonth = writable(new Date().getMonth())
export const pickYear = writable(new Date().getFullYear())

export const todayDay = writable(new Date().getDate())
export const todayMonth = writable(new Date().getMonth())
export const todayYear = writable(new Date().getFullYear())
