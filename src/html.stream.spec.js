import test from 'ava'

import Html from './html'

test('bold', (t) => {
  const stream = Html.createStream()
  stream.write({ bold: true })
  t.is(stream.read(), '<span class="bold">')
  stream.end()
})

test('italic', (t) => {
  const stream = Html.createStream()
  stream.write({ italic: true })
  t.is(stream.read(), '<span class="italic">')
  stream.end()
})

test('underline', (t) => {
  const stream = Html.createStream()
  stream.write({ underline: true })
  t.is(stream.read(), '<span class="underline">')
  stream.end()
})

test('auto close tag', (t) => {
  const stream = Html.createStream()
  stream.write({ bold: true })
  stream.end()
  t.is(stream.read(), '<span class="bold">')
  t.is(stream.read(), '</span>')
})
