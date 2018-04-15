import test from 'ava'
import pull from 'pull-stream'

import createTokenStream from './token.stream'

test.cb('green text', (t) => {
  pull.pull(
    pull.values([
      '\x1b[32mgreen text'
    ]),
    createTokenStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [{
        type: 'ansi',
        value: [32]
      }, {
        type: 'text',
        value: 'green text'
      }])
      t.end()
    })
  )
})

test.cb('bold red text', (t) => {
  pull.pull(
    pull.values([
      'this is \x1b[31m\x1b[1mbold red text'
    ]),
    createTokenStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [{
        type: 'text',
        value: 'this is '
      }, {
        type: 'ansi',
        value: [31]
      }, {
        type: 'ansi',
        value: [1]
      }, {
        type: 'text',
        value: 'bold red text'
      }])
      t.end()
    })
  )
})

test.cb('reset', (t) => {
  pull.pull(
    pull.values([
      'this is \x1b[3msarcastic\x1b[0m text'
    ]),
    createTokenStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [{
        type: 'text',
        value: 'this is '
      }, {
        type: 'ansi',
        value: [3]
      }, {
        type: 'text',
        value: 'sarcastic'
      }, {
        type: 'ansi',
        value: [0]
      }, {
        type: 'text',
        value: ' text'
      }])
      t.end()
    })
  )
})
