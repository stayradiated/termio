import test from 'ava'

import Ansi from './ansi'

test('able to write to stream', (t) => {
  const stream = Ansi.createStream()
  stream.write(1)
  t.deepEqual(stream.read(), {
    bold: true
  })
  stream.end()
})

test('write multiple values to the stream in an array', (t) => {
  const stream = Ansi.createStream()
  stream.write([1, 3, 4])
  t.deepEqual(stream.read(), {
    bold: true,
    italic: true,
    underline: true
  })
  stream.end()
})
