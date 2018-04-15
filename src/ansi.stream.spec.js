import test from 'ava'
import pull from 'pull-stream'

import createAnsiStream from './ansi.stream'

test.cb('able to write to stream', (t) => {
  pull.pull(
    pull.values([
      1,
    ]),
    createAnsiStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [{
        bold: true
      }])
      t.end()
    })
  )
})

test.cb('write multiple values to the stream in an array', (t) => {
  pull.pull(
    pull.values([
      1,
      3,
      4,
    ]),
    createAnsiStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [{
        bold: true,
      }, {
        bold: true,
        italic: true,
      }, {
        bold: true,
        italic: true,
        underline: true
      }])
      t.end()
    })
  )
})
