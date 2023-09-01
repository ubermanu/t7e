import { none, type PluralForm } from './plural/forms.js'
import { rules } from './plural/rules.js'
import type { Translation } from './translation.js'

export type TranslateOptions = {
  count?: number
  context?: string
  values?: any[]
}

/**
 * A dictionary contains many translations. It is defined to target a specific
 * language.
 */
export class Dictionary {
  _lang: string

  /**
   * A map of translations. The key is a tuple of the message id and the
   * context. The value is the translation itself.
   */
  _msg: Map<string, Translation> = new Map()

  /**
   * The plural form of the language. It is used to determine the correct
   * translation when the count option is given.
   */
  _pluralForm: PluralForm = none

  // TODO: Check the format of the locale string (must be xx or xx-YY)
  constructor(lang: string, resolvePluralForm: boolean = true) {
    this._lang = lang

    // Resolve the plural form of the language.
    // This module is shipped with a list of plural forms for many languages.
    if (resolvePluralForm) {
      const rule = rules[lang.split('-')[0]] ?? rules[lang]
      if (rule) {
        this._pluralForm = rule
      }
    }
  }

  get lang(): string {
    return this._lang
  }

  get pluralForm(): PluralForm {
    return this._pluralForm
  }

  set pluralForm(pluralForm: PluralForm) {
    this._pluralForm = pluralForm
  }

  addTranslation(msg: Translation): void {
    const key: string = JSON.stringify([msg.id, msg.context || ''])
    this._msg.set(key, msg)
  }

  /**
   * Translates a string.
   *
   * If the count option is given, the plural form is used. The plural form is
   * determined by a number of rules, depending on the language. TBD
   *
   * If the context option is given, the translation is chosen based on the
   * context.
   *
   * Example:
   *
   * ```js
   * const dict = new Dictionary('fr')
   *
   * dict.addTranslation({
   *   id: 'Hello',
   *   strings: ['Bonjour'],
   * })
   *
   * dict.addTranslation({
   *   id: 'Hello',
   *   strings: ['Salut'],
   *   context: 'formal',
   * })
   *
   * dict.translate('Hello', { context: 'formal' }) // => 'Salut'
   * ```
   */
  translate(str: string, options?: TranslateOptions): string {
    const key: string = JSON.stringify([str, options?.context || ''])

    if (!this._msg.has(key)) {
      return str
    }

    const msg = this._msg.get(key)!
    let output: string

    // If the plural form returns a number, it is used as an index to choose
    // the correct string.
    // If the plural form returns a boolean, it uses the index 1 if true, 0
    // otherwise.
    if (options?.count !== undefined) {
      const res = this._pluralForm.plural(options.count)
      const index = typeof res === 'number' ? res : res ? 1 : 0
      output = msg.strings[index]
    }

    output ??= msg.strings[0]
    output ??= str

    if (options?.values) {
      const values = options.values
      output = output.replace(
        /%s|%d|%f/g,
        () => values!.shift()?.toString() ?? ''
      )
    }

    return output
  }
}
