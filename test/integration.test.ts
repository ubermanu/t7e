import test from 'ava'
import {
  Dictionary,
  registerDictionary,
  setLocale,
  t as tt,
} from '../src/main.js'

const dict = new Dictionary('fr')

test.before(() => {
  setLocale('fr')
  registerDictionary(dict)
})

test('basic translation (literal)', (t) => {
  dict.addTranslation({
    id: 'Hello!',
    strings: ['Bonjour!'],
  })

  t.is(tt`Hello!`, 'Bonjour!')
})

test('translate a string with placeholder (literal)', (t) => {
  dict.addTranslation({
    id: 'Hello %s!',
    strings: ['Bonjour %s!'],
  })

  const who = 'Bob'
  t.is(tt`Hello ${who}!`, 'Bonjour Bob!')
})

test('translate a string with plural form (literal)', (t) => {
  dict.addTranslation({
    id: 'You have %d message.',
    plural_id: 'You have %d messages.',
    strings: ['Vous avez %d message.', 'Vous avez %d messages.'],
  })

  t.is(tt`You have ${1} message.`, 'Vous avez 1 message.')
  t.is(tt`You have ${2} message.`, 'Vous avez 2 messages.')
})
