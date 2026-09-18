export const money = (cents: number, currency = 'BRL') =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(cents / 100)

export const cn = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ')

export const toSlug = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
