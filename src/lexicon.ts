import { Dictionary, type TranslateOptions } from './dictionary.js'

/**
 * A lexicon is a collection of dictionaries. It is used to translate strings
 * into different languages.
 */
export class Lexicon {
  /**
   * A map of dictionaries. The key is the language. The value is the
   * dictionary.
   */
  _dict: Map<string, Dictionary> = new Map()

  registerDictionary(dict: Dictionary): void {
    this._dict.set(dict.lang, dict)
  }

  /**
   * Translate a string into the given language.
   *
   * @see Dictionary.translate
   */
  translate(str: string, lang: string, options?: TranslateOptions): string {
    return this._dict.get(lang)?.translate(str, options) ?? str
  }
}
