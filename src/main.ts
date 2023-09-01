import type { TranslateOptions } from './dictionary.js'
import { Lexicon } from './lexicon.js'
import { getLocale } from './locale.js'

export * from './dictionary.js'
export * from './lexicon.js'
export * from './locale.js'
export * from './translation.js'

/**
 * The default lexicon contains all the translations for all the languages. It
 * is used by the `translate` function.
 */
const lex = new Lexicon()

/** Translate a string into the given language. */
export const translate = lex.translate.bind(lex)

/** Add a dictionary to the default lexicon. */
export const registerDictionary = lex.registerDictionary.bind(lex)

/**
 * Translate a string using tagged template literals. Uses the current locale.
 * Also sets up the correct placeholders, so the variables are not mixed up.
 *
 * If a value is a number, it will be formatted using the dictionary's plural
 * form.
 */
function process_template_literal(
  strings: TemplateStringsArray,
  values: any[],
  options?: TranslateOptions
): string {
  let count = undefined

  // Transforms the template string into a single string with placeholders (%s)
  // For each value, set the correct placeholder (%s, %d, %f)
  const token = strings.reduce((acc, str, i) => {
    if (values.length <= i) {
      return acc + str
    }
    if (typeof values[i] === 'number') {
      count = values[i]
      return acc + str + (Number.isInteger(values[i]) ? '%d' : '%f')
    }
    return acc + str + '%s'
  }, '')

  return lex.translate(token, getLocale(), {
    ...options,
    count,
    values,
  })
}

/** Translate a string using the current locale. */
export function t(strings: TemplateStringsArray, ...values: any[]): string {
  return process_template_literal(strings, values)
}

/** Generate a new function that translates a string in a specific context. */
t.context = function (context: string) {
  return (strings: TemplateStringsArray, ...values: any[]) => {
    return process_template_literal(strings, values, { context })
  }
}
