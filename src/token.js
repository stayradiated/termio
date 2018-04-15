const getNumbers = (string) => {
  const matches = string.match(/\d+/g)
  if (Array.isArray(matches)) {
    return matches.map((number) => parseInt(number, 10))
  }
  return []
}

const replaceAnsi = (codes) => {
  codes = getNumbers(codes)
  if (codes.length === 0) {
    codes = [0]
  }
  return {
    type: 'ansi',
    value: codes
  }
}

const replaceOtherAnsi = (codes) => {
  return {
    type: 'ansi-other',
    value: codes
  }
}

const replaceText = (text) => {
  return {
    type: 'text',
    value: text
  }
}

const replaceEscape = () => {
  return {
    type: 'text',
    value: 'ESC'
  }
}

const tokens = [
  // SGR escape codes
  [ /^\x1b\[(?:\d{0,3};?)+m/, replaceAnsi ],

  // All other escape codes
  [ /^\x1b\[[^@-~]*[@-~]/, replaceOtherAnsi ],

  // Replace ^[ chars
  [ /^\x1b/, replaceEscape ],

  // Keep actual text
  [ /^([^\x1b]+)/m, replaceText ]
]

const replaceAndPush = (fn, output) => {
  return (match) => {
    output.push(fn(match))
    return ''
  }
}

class Token {
  write (data) {
    const output = []
    let input = data.toString()

    while (input.length > 0) {
      const startLength = input.length

      forLoop:
      for (let i = 0; i < tokens.length; i++) {
        const [ regex, replaceFn ] = tokens[i]
        if (regex.test(input)) {
          input = input.replace(regex, replaceAndPush(replaceFn, output))
          break forLoop
        }
      }

      if (input.length === startLength) {
        // no more escape characters to find
        break
      }
    }

    return output
  }
}

export default Token
