import test from 'ava'
import pull from 'pull-stream'

import createHtmlStream from './html.stream'

test.cb('bold', (t) => {
  pull.pull(
    pull.values([{
      bold: true
    }]),
    createHtmlStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [
        '<span class="bold">',
        '</span>'
      ])
      t.end()
    })
  )
})

test.cb('italic', (t) => {
  pull.pull(
    pull.values([{
      italic: true
    }]),
    createHtmlStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [
        '<span class="italic">',
        '</span>'
      ])
      t.end()
    })
  )
})

test.cb('underline', (t) => {
  pull.pull(
    pull.values([{
      underline: true
    }]),
    createHtmlStream(),
    pull.collect((err, values) => {
      t.is(err, null)
      t.deepEqual(values, [
        '<span class="underline">',
        '</span>'
      ])
      t.end()
    })
  )
})
