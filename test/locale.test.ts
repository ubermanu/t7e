import test from 'ava'
import { env } from 'node:process'
import { detectLocale, getLocale, setLocale } from '../src/locale.js'

// Reset the locale values before each test
test.beforeEach(() => {
  setLocale('en')
})

test('the default locale is `en`', (t) => {
  t.is(getLocale(), 'en')
})

test('setLocale sets the locale', (t) => {
  setLocale('fr')
  t.is(getLocale(), 'fr')
})

test('detectLocale sets the locale based on the LANG environment variable', (t) => {
  env.LANG = 'fr_FR.UTF-8'
  detectLocale()
  t.is(getLocale(), 'fr-FR')
})
