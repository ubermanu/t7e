let currentLocale = 'en'

export function setLocale(locale: string): void {
  currentLocale = locale
}

export function getLocale(): string {
  return currentLocale
}

/** Detect the locale based on the environment variables. */
export function detectLocale(): void {
  if (typeof process !== 'undefined') {
    const env = process.env
    const language = env.LANG || env.LANGUAGE || env.LC_ALL || env.LC_MESSAGES
    const envLocale = language?.replace(/_/g, '-').split('.')[0]
    if (envLocale) {
      setLocale(envLocale)
    }
  } else if (typeof window !== 'undefined') {
    // TODO: Check the format of the locale string (must be xx or xx-YY)
    if (navigator.language) {
      setLocale(navigator.language)
    }
  }
}
