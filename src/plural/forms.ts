export type PluralForm = {
  n: number
  plural: (n: number) => boolean | number
}

const none: PluralForm = {
  n: 1,
  plural: () => false,
}

const not_one: PluralForm = {
  n: 2,
  plural: (n: number) => n !== 1,
}

const more_than_one: PluralForm = {
  n: 2,
  plural: (n: number) => n > 1,
}

const slavic: PluralForm = {
  n: 3,
  plural: (n: number) =>
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2,
}

export { more_than_one, none, not_one, slavic }
