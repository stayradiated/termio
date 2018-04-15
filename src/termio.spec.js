import test from 'ava'
import pull from 'pull-stream'

import createTermioStream from './termio'

test.cb('bold text', (t) => {
  pull.pull(
    pull.values([
      '\x1b[1m', 'bold',
    ]),
    createTermioStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [
        '<span class="bold">',
        'bold',
        '</span>',
      ])
      t.end()
    })
  )
})

test.cb('text styles', (t) => {
  pull.pull(
    pull.values([
      '\x1b[1m', 'bold',
      '\x1b[3m', 'bold & italic',
      '\x1b[4m', 'bold & italic & underline',
      '\x1b[23m', 'bold & underline',
      '\x1b[21m', 'underline'
    ]),
    createTermioStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [
        '<span class="bold">',
        'bold',
        '<span class="italic">',
        'bold &amp; italic',
        '<span class="underline">',
        'bold &amp; italic &amp; underline',
        '</span></span><span class="underline">',
        'bold &amp; underline',
        '</span></span><span class="underline">',
        'underline',
        '</span>'
      ])
      t.end()
    })
  )
})

test.cb('foreground/background colors', (t) => {
  pull.pull(
    pull.values([
      '\x1b[34m',
      '\x1b[32m',
      '\x1b[40m',
      '\x1b[42m',
      '\x1b[36m'
    ]),
    createTermioStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [
        '<span class="foreground-4">',
        '</span><span class="foreground-2">',
        '<span class="background-0">',
        '</span><span class="background-2">',
        '</span></span><span class="background-2"><span class="foreground-6">',
        '</span></span>',
      ])
      t.end()
    })
  )
})

test.cb('reverse video', (t) => {
  pull.pull(
    pull.values([
      '\x1b[7m',
      '\x1b[31m',
      '\x1b[107m',
      '\x1b[27m'
    ]),
    createTermioStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [
        '<span class="reverse"><span class="foreground-bg"><span class="background-fg">',
        '</span><span class="background-1">',
        '</span></span><span class="background-1"><span class="foreground-15">',
        '</span></span></span><span class="background-15"><span class="foreground-1">',
        '</span></span>',
      ])
      t.end()
    })
  )
})
