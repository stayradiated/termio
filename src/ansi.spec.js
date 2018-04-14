import test from 'ava'

import Ansi from './ansi'

test('initial state', (t) => {
  const ansi = new Ansi()
  t.deepEqual(ansi.attrs(), {})
})

test('styles', (t) => {
  const ansi = new Ansi()
  ansi.write(1)
  ansi.write(3)
  ansi.write(4)
  ansi.write(7)
  ansi.write(8)
  ansi.write(9)
  ansi.write(30)
  ansi.write(40)

  t.deepEqual(ansi.attrs(), {
    bold: true,
    italic: true,
    underline: true,
    strike: true,
    reverse: true,
    conceal: true,
    background: 0,
    foreground: 0
  })
})

test('reset styles', (t) => {
  const ansi = new Ansi()
  ansi.write(1)
  ansi.write(3)
  ansi.write(4)
  ansi.write(7)
  ansi.write(8)
  ansi.write(9)
  ansi.write(30)
  ansi.write(40)

  // reset all
  ansi.write(0)

  t.deepEqual(ansi.attrs(), {})
})

test('set bold', (t) => {
  const ansi = new Ansi()
  ansi.write(1)
  t.deepEqual(ansi.attrs(), { bold: true })
})

test('reset bold', (t) => {
  const ansi = new Ansi()
  ansi.write(1)
  ansi.write(21)
  t.deepEqual(ansi.attrs(), {})
})

test('set italic', (t) => {
  const ansi = new Ansi()
  ansi.write(3)
  t.deepEqual(ansi.attrs(), { italic: true })
})

test('reset italic', (t) => {
  const ansi = new Ansi()
  ansi.write(3)
  ansi.write(23)
  t.deepEqual(ansi.attrs(), {})
})

test('set underline', (t) => {
  const ansi = new Ansi()
  ansi.write(4)
  t.deepEqual(ansi.attrs(), { underline: true })
})

test('reset underline', (t) => {
  const ansi = new Ansi()
  ansi.write(4)
  ansi.write(24)
  t.deepEqual(ansi.attrs(), {})
})

test('set conceal', (t) => {
  const ansi = new Ansi()
  ansi.write(8)
  t.deepEqual(ansi.attrs(), { conceal: true })
})

test('reset conceal', (t) => {
  const ansi = new Ansi()
  ansi.write(8)
  ansi.write(28)
  t.deepEqual(ansi.attrs(), {})
})

test('set strike', (t) => {
  const ansi = new Ansi()
  ansi.write(9)
  t.deepEqual(ansi.attrs(), { strike: true })
})

test('reset strike', (t) => {
  const ansi = new Ansi()
  ansi.write(9)
  ansi.write(29)
  t.deepEqual(ansi.attrs(), {})
})

test('foreground colors', (t) => {
  for (let i = 0; i < 8; i++) {
    const ansi = new Ansi()
    ansi.write(30 + i)
    t.deepEqual(ansi.attrs(), {
      foreground: i
    })
  }
})

test('bright foreground colors', (t) => {
  for (let i = 0; i < 8; i++) {
    const ansi = new Ansi()
    ansi.write(90 + i)
    t.deepEqual(ansi.attrs(), {
      foreground: 8 + i
    })
  }
})

test('background colors', (t) => {
  for (let i = 0; i < 8; i++) {
    const ansi = new Ansi()
    ansi.write(40 + i)
    t.deepEqual(ansi.attrs(), {
      background: i
    })
  }
})

test('bright background colors', (t) => {
  for (let i = 0; i < 8; i++) {
    const ansi = new Ansi()
    ansi.write(100 + i)
    t.deepEqual(ansi.attrs(), {
      background: 8 + i
    })
  }
})

test('256 foreground colors', (t) => {
  for (let i = 0; i < 256; i++) {
    const ansi = new Ansi()
    ansi.write(38)
    ansi.write(5)
    ansi.write(i)
    t.deepEqual(ansi.attrs(), {
      foreground: i
    })
  }
})

test('256 foreground colors', (t) => {
  for (let i = 0; i < 256; i++) {
    const ansi = new Ansi()
    ansi.write(48)
    ansi.write(5)
    ansi.write(i)
    t.deepEqual(ansi.attrs(), {
      background: i
    })
  }
})

test('reverse foreground and background', (t) => {
  const ansi = new Ansi()
  ansi.write(7)
  t.deepEqual(ansi.attrs(), {
    reverse: true,
    background: 'fg',
    foreground: 'bg'
  })
})

test('reset reverse foreground and background', (t) => {
  const ansi = new Ansi()
  ansi.write(7)
  ansi.write(27)
  t.deepEqual(ansi.attrs(), {})
})
