import test from 'ava'

import Token from './token'

const esc = (code, suffix = 'm') => {
  if (Array.isArray(code)) {
    code = code.join(';')
  }
  return '\x1b[' + code + suffix
}

test('detect foreground colors', (t) => {
  const token = new Token()
  const result = token.write([
    esc(30), 'black',
    esc(31), 'red',
    esc(32), 'green',
    esc(33), 'yellow',
    esc(34), 'blue',
    esc(35), 'magenta',
    esc(36), 'cyan',
    esc(37), 'white',
    esc(39)
  ].join(''))
  t.deepEqual(result, [
    { type: 'ansi', value: [30] },
    { type: 'text', value: 'black' },
    { type: 'ansi', value: [31] },
    { type: 'text', value: 'red' },
    { type: 'ansi', value: [32] },
    { type: 'text', value: 'green' },
    { type: 'ansi', value: [33] },
    { type: 'text', value: 'yellow' },
    { type: 'ansi', value: [34] },
    { type: 'text', value: 'blue' },
    { type: 'ansi', value: [35] },
    { type: 'text', value: 'magenta' },
    { type: 'ansi', value: [36] },
    { type: 'text', value: 'cyan' },
    { type: 'ansi', value: [37] },
    { type: 'text', value: 'white' },
    { type: 'ansi', value: [39] }
  ])
})

test('detect bright foreground colors', (t) => {
  const token = new Token()
  const result = token.write([
    esc(90), 'black',
    esc(91), 'red',
    esc(92), 'green',
    esc(93), 'yellow',
    esc(94), 'blue',
    esc(95), 'magenta',
    esc(96), 'cyan',
    esc(97), 'white',
    esc(39)
  ].join(''))
  t.deepEqual(result, [
    { type: 'ansi', value: [90] },
    { type: 'text', value: 'black' },
    { type: 'ansi', value: [91] },
    { type: 'text', value: 'red' },
    { type: 'ansi', value: [92] },
    { type: 'text', value: 'green' },
    { type: 'ansi', value: [93] },
    { type: 'text', value: 'yellow' },
    { type: 'ansi', value: [94] },
    { type: 'text', value: 'blue' },
    { type: 'ansi', value: [95] },
    { type: 'text', value: 'magenta' },
    { type: 'ansi', value: [96] },
    { type: 'text', value: 'cyan' },
    { type: 'ansi', value: [97] },
    { type: 'text', value: 'white' },
    { type: 'ansi', value: [39] }
  ])
})

test('detect background colors', (t) => {
  const token = new Token()
  const result = token.write([
    esc(40), 'black',
    esc(41), 'red',
    esc(42), 'green',
    esc(43), 'yellow',
    esc(44), 'blue',
    esc(45), 'magenta',
    esc(46), 'cyan',
    esc(47), 'white',
    esc(49)
  ].join(''))
  t.deepEqual(result, [
    { type: 'ansi', value: [40] },
    { type: 'text', value: 'black' },
    { type: 'ansi', value: [41] },
    { type: 'text', value: 'red' },
    { type: 'ansi', value: [42] },
    { type: 'text', value: 'green' },
    { type: 'ansi', value: [43] },
    { type: 'text', value: 'yellow' },
    { type: 'ansi', value: [44] },
    { type: 'text', value: 'blue' },
    { type: 'ansi', value: [45] },
    { type: 'text', value: 'magenta' },
    { type: 'ansi', value: [46] },
    { type: 'text', value: 'cyan' },
    { type: 'ansi', value: [47] },
    { type: 'text', value: 'white' },
    { type: 'ansi', value: [49] }
  ])
})

test('detect bright background colors', (t) => {
  const token = new Token()
  const result = token.write([
    esc(100), 'black',
    esc(101), 'red',
    esc(102), 'green',
    esc(103), 'yellow',
    esc(104), 'blue',
    esc(105), 'magenta',
    esc(106), 'cyan',
    esc(107), 'white',
    esc(49)
  ].join(''))
  t.deepEqual(result, [
    { type: 'ansi', value: [100] },
    { type: 'text', value: 'black' },
    { type: 'ansi', value: [101] },
    { type: 'text', value: 'red' },
    { type: 'ansi', value: [102] },
    { type: 'text', value: 'green' },
    { type: 'ansi', value: [103] },
    { type: 'text', value: 'yellow' },
    { type: 'ansi', value: [104] },
    { type: 'text', value: 'blue' },
    { type: 'ansi', value: [105] },
    { type: 'text', value: 'magenta' },
    { type: 'ansi', value: [106] },
    { type: 'text', value: 'cyan' },
    { type: 'ansi', value: [107] },
    { type: 'text', value: 'white' },
    { type: 'ansi', value: [49] }
  ])
})

test('detect text styles', (t) => {
  const token = new Token()
  const result = token.write([
    esc(1), 'bold', esc(21),
    esc(3), 'italic', esc(23),
    esc(4), 'underline', esc(24),
    esc(7), 'reverse', esc(27),
    esc(8), 'conceal', esc(28),
    esc(9), 'strike', esc(29)
  ].join(''))
  t.deepEqual(result, [
    { type: 'ansi', value: [1] },
    { type: 'text', value: 'bold' },
    { type: 'ansi', value: [21] },
    { type: 'ansi', value: [3] },
    { type: 'text', value: 'italic' },
    { type: 'ansi', value: [23] },
    { type: 'ansi', value: [4] },
    { type: 'text', value: 'underline' },
    { type: 'ansi', value: [24] },
    { type: 'ansi', value: [7] },
    { type: 'text', value: 'reverse' },
    { type: 'ansi', value: [27] },
    { type: 'ansi', value: [8] },
    { type: 'text', value: 'conceal' },
    { type: 'ansi', value: [28] },
    { type: 'ansi', value: [9] },
    { type: 'text', value: 'strike' },
    { type: 'ansi', value: [29] }
  ])
})

test('detect multiple codes in a single escape', (t) => {
  const token = new Token()
  const result = token.write([
    esc([ 1, 40, 31 ]),
    'bold red text on black',
    esc(0)
  ].join(''))
  t.deepEqual(result, [
    { type: 'ansi', value: [1, 40, 31] },
    { type: 'text', value: 'bold red text on black' },
    { type: 'ansi', value: [0] }
  ])
})

test('default to 0 (reset)', (t) => {
  const token = new Token()
  const result = token.write([
    esc([1, 32]), 'bold yellow',
    esc(''), 'plain text'
  ].join(''))
  t.deepEqual(result, [
    { type: 'ansi', value: [1, 32] },
    { type: 'text', value: 'bold yellow' },
    { type: 'ansi', value: [0] },
    { type: 'text', value: 'plain text' }
  ])
})

// NOTE: logging this will mess up the console output
test('detect other ansi escape codes', (t) => {
  const token = new Token()
  const result = token.write([
    esc(1, 'A'),
    esc(1, 'B'),
    esc(1, 'C'),
    esc(1, 'D'),
    esc(1, 'E'),
    esc(1, 'F'),
    esc(1, 'G'),
    esc([1, 1], 'H'),
    esc(1, 'J'),
    esc(1, 'K'),
    esc(1, 'S'),
    esc(1, 'T'),
    esc([1, 1], 'f'),
    esc(6, 'n'),
    esc(1, 's'),
    esc(1, 'u'),
    esc('?25', 'l'),
    esc('?25', 'h')
  ].join(''))
  t.deepEqual(result, [
    { type: 'ansi-other', value: '\u001b[1A' },
    { type: 'ansi-other', value: '\u001b[1B' },
    { type: 'ansi-other', value: '\u001b[1C' },
    { type: 'ansi-other', value: '\u001b[1D' },
    { type: 'ansi-other', value: '\u001b[1E' },
    { type: 'ansi-other', value: '\u001b[1F' },
    { type: 'ansi-other', value: '\u001b[1G' },
    { type: 'ansi-other', value: '\u001b[1;1H' },
    { type: 'ansi-other', value: '\u001b[1J' },
    { type: 'ansi-other', value: '\u001b[1K' },
    { type: 'ansi-other', value: '\u001b[1S' },
    { type: 'ansi-other', value: '\u001b[1T' },
    { type: 'ansi-other', value: '\u001b[1;1f' },
    { type: 'ansi-other', value: '\u001b[6n' },
    { type: 'ansi-other', value: '\u001b[1s' },
    { type: 'ansi-other', value: '\u001b[1u' },
    { type: 'ansi-other', value: '\u001b[?25l' },
    { type: 'ansi-other', value: '\u001b[?25h' }
  ])
})
