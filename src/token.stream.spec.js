import test from 'ava'

import Token from './token'

test('green text', (t) => {
  const stream = Token.createStream()
  stream.write('\x1b[32mgreen text')
  t.deepEqual(stream.read(), {
    type: 'ansi',
    value: [32]
  })
  t.deepEqual(stream.read(), {
    type: 'text',
    value: 'green text'
  })
})

test('bold red text', (t) => {
  const stream = Token.createStream()
  stream.write('this is \x1b[31m\x1b[1mbold red text')
  t.deepEqual(stream.read(), {
    type: 'text',
    value: 'this is '
  })
  t.deepEqual(stream.read(), {
    type: 'ansi',
    value: [31]
  })
  t.deepEqual(stream.read(), {
    type: 'ansi',
    value: [1]
  })
  t.deepEqual(stream.read(), {
    type: 'text',
    value: 'bold red text'
  })
})

test('reset', (t) => {
  const stream = Token.createStream()
  stream.write('this is \x1b[3msarcastic\x1b[0m text')
  t.deepEqual(stream.read(), {
    type: 'text',
    value: 'this is '
  })
  t.deepEqual(stream.read(), {
    type: 'ansi',
    value: [3]
  })
  t.deepEqual(stream.read(), {
    type: 'text',
    value: 'sarcastic'
  })
  t.deepEqual(stream.read(), {
    type: 'ansi',
    value: [0]
  })
  t.deepEqual(stream.read(), {
    type: 'text',
    value: ' text'
  })
})
