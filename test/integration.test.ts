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

test('translate a string with context (literal)', (t) => {
  dict.addTranslation({
    id: 'You are tall',
    strings: ['Tu es grand'],
    context: 'm',
  })

  dict.addTranslation({
    id: 'You are tall',
    strings: ['Tu es grande'],
    context: 'f',
  })

  dict.addTranslation({
    id: 'You are tall',
    strings: ['Tu es grand(e)'],
  })

  const tu = tt.context('') // default context
  const tm = tt.context('m') // masculine context
  const tf = tt.context('f') // feminine context

  t.is(tu`You are tall`, 'Tu es grand(e)')
  t.is(tm`You are tall`, 'Tu es grand')
  t.is(tf`You are tall`, 'Tu es grande')
})
