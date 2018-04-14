import test from 'ava'

import createTermioStream from './index'

test.cb.only('bold text', (t) => {
  const stream = createTermioStream()
  stream.write([
    '\x1b[1m', 'bold',
  ].join(''))

  t.plan(1)
  setImmediate(() => {
    t.is(stream.read().toString(), [
      '<span class="bold">bold</span>'
    ].join(''))
    t.end()
  })
})

test.cb('should handle text styles', (t) => {
  const stream = createTermioStream()
  stream.write([
    '\x1b[1m', 'bold',
    '\x1b[3m', 'bold & italic',
    '\x1b[4m', 'bold & italic & underline',
    '\x1b[23m', 'bold & underline',
    '\x1b[21m', 'underline'
  ].join(''))

  t.plan(1)
  setImmediate(() => {
    t.is(stream.read().toString(), [
      '<span class="bold">'
    ].join(''))
    t.end()
  })
})

// test('should handle foreground/background colors', (t) => {
//   ansi.write(34)
//   test('<span class="foreground-4">')
//
//   ansi.write(32)
//   test('</span><span class="foreground-2">')
//
//   ansi.write(40)
//   test('<span class="background-0">')
//
//   ansi.write(42)
//   test('</span><span class="background-2">')
//
//   ansi.write(36)
//   test('</span></span><span class="background-2"><span class="foreground-6">')
//
//   ansi.end()
//   test('</span></span>')
// })
//
// test('should handle reverse video', (t) => {
//   ansi.write(7)
//   ansi.write(31)
//   ansi.write(107)
//   ansi.write(27)
//   ansi.end()
//
//   test(['<span class="reverse">',
//     '<span class="foreground-bg">',
//     '<span class="background-fg">'])
//   test([ '</span>',
//     '<span class="background-1">'])
//   test([ '</span>',
//     '</span>',
//     '<span class="background-1">',
//     '<span class="foreground-15">'])
//   test([ '</span>',
//     '</span>',
//     '</span>',
//     '<span class="background-15">',
//     '<span class="foreground-1">'])
//   test([ '</span>',
//     '</span>'])
// })
