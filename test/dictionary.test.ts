import test from 'ava'
import { Dictionary } from '../src/dictionary.js'

test('create a dictionary', (t) => {
  const dict = new Dictionary('de')
  t.is(dict.lang, 'de')
})

test('translate a string', (t) => {
  const dict = new Dictionary('de')

  dict.addTranslation({
    id: 'Hello world!',
    strings: ['Hallo Welt!'],
  })

  t.is(dict.translate('Hello world!'), 'Hallo Welt!')
})

test('translate a string with placeholders', (t) => {
  const dict = new Dictionary('de')

  dict.addTranslation({
    id: 'Hello %s!',
    strings: ['Hallo %s!'],
  })

  t.is(dict.translate('Hello %s!'), 'Hallo %s!')
})

test('translate a string with values', (t) => {
  const dict = new Dictionary('de')

  dict.addTranslation({
    id: 'Hello %s!',
    strings: ['Hallo %s!'],
  })

  t.is(dict.translate('Hello %s!', { values: ['world'] }), 'Hallo world!')
})

test('translate a string with values (multiple)', (t) => {
  const dict = new Dictionary('de')

  dict.addTranslation({
    id: 'Hello %s %s!',
    strings: ['Hallo %s %s!'],
  })

  t.is(
    dict.translate('Hello %s %s!', { values: ['world', 'again'] }),
    'Hallo world again!'
  )
})

test('translate a string with values (multiple, extra)', (t) => {
  const dict = new Dictionary('de')

  dict.addTranslation({
    id: 'Hello %s %s!',
    strings: ['Hallo %s %s!'],
  })

  t.is(
    dict.translate('Hello %s %s!', { values: ['world', 'again', 'extra'] }),
    'Hallo world again!'
  )
})

test('translate a string with values (multiple, missing)', (t) => {
  const dict = new Dictionary('de')

  dict.addTranslation({
    id: 'Hello %s %s!',
    strings: ['Hallo %s %s!'],
  })

  t.is(dict.translate('Hello %s %s!', { values: ['world'] }), 'Hallo world !')
})

test('translate a string with plural form', (t) => {
  const dict = new Dictionary('de')

  dict.addTranslation({
    id: 'You have %d message.',
    plural_id: 'You have %d messages.',
    strings: ['Du hast %d Nachricht.', 'Du hast %d Nachrichten.'],
  })

  t.is(
    dict.translate('You have %d message.', { count: 1, values: [1] }),
    'Du hast 1 Nachricht.'
  )

  t.is(
    dict.translate('You have %d message.', { count: 2, values: [2] }),
    'Du hast 2 Nachrichten.'
  )
})
