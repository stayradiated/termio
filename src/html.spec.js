import test from 'ava'

import Html from './html'

test('write empty object', (t) => {
  const html = new Html()
  const result = html.write({})
  t.is(result, '')
})

test('bold', (t) => {
  const html = new Html()
  const result = html.write({ bold: true })
  t.is(result, '<span class="bold">')
})

test('italic', (t) => {
  const html = new Html()
  const result = html.write({ italic: true })
  t.is(result, '<span class="italic">')
})

test('underline', (t) => {
  const html = new Html()
  const result = html.write({ underline: true })
  t.is(result, '<span class="underline">')
})

test('adding/removing bold/italic/underline', (t) => {
  const html = new Html()
  const result = [
    html.write({ bold: true }),
    html.write({ bold: true, italic: true }),
    html.write({ bold: true, italic: true, underline: true }),
    html.write({ italic: true, underline: true }),
    html.write({ underline: true }),
    html.write({ }),
    html.end()
  ]
  t.deepEqual(result, [
    '<span class="bold">',
    '<span class="italic">',
    '<span class="underline">',
    '</span></span></span><span class="italic"><span class="underline">',
    '</span></span><span class="underline">',
    '</span>',
    ''
  ])
})

test('add multiple attributse', (t) => {
  const html = new Html()
  const result = [
    html.write({ bold: true, italic: true, underline: true }),
    html.end()
  ]
  t.deepEqual(result, [
    '<span class="bold"><span class="italic"><span class="underline">',
    '</span></span></span>'
  ])
})

test('handle foreground/background colors', (t) => {
  const html = new Html()
  const result = [
    html.write({ foreground: 1 }),
    html.write({ foreground: 2 }),
    html.write({ foreground: 2, background: 8 }),
    html.write({ foreground: 2, background: 9 }),
    html.write({ foreground: 3, background: 9 }),
    html.end()
  ]
  t.deepEqual(result, [
    '<span class="foreground-1">',
    '</span><span class="foreground-2">',
    '<span class="background-8">',
    '</span><span class="background-9">',
    '</span></span><span class="foreground-3"><span class="background-9">',
    '</span></span>'
  ])
})

test('handle reverse video', (t) => {
  const html = new Html()
  const result = [
    html.write({ reverse: true }),
    html.write({ reverse: true, background: 2 }),
    html.write({ reverse: true, background: 2, foreground: 7 }),
    html.write({ background: 2, foreground: 7 }),
    html.end()
  ]
  t.deepEqual(result, [
    '<span class="reverse">',
    '<span class="background-2">',
    '<span class="foreground-7">',
    '</span></span></span><span class="background-2"><span class="foreground-7">',
    '</span></span>'
  ])
})
