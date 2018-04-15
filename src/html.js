const TAG = 'span'
const PROP = 'class'
const CLOSE_TAG = `</${TAG}>`

const ATTR_ORDER = [
  'bold',
  'italic',
  'underline',
  'background',
  'foreground'
]

const difference = (a1, b2) => {
  return a1.filter((val) => !b2.includes(val))
}

const createTag = (classname) => `<${TAG} ${PROP}="${classname}">`

const getName = (key, value) => {
  if (value === true) {
    return key
  }
  return `${key}-${value}`
}

class Html {
  constructor () {
    this.stack = []
  }

  write (attrs) {
    let output = ''

    // get ansi attrs
    const keys = Object.keys(attrs).map((key) => {
      return getName(key, attrs[key])
    })

    // close stack items no longer present
    while (difference(this.stack, keys).length > 0) {
      this.stack.pop()
      output += CLOSE_TAG
    }

    // find keys that are not in the stack
    const missing = difference(keys, this.stack)

    // sort missing items by ATTR_ORDER
    missing.sort((a, b) => ATTR_ORDER.indexOf(a) - ATTR_ORDER.indexOf(b))

    // add attrs & create spans
    missing.forEach((key) => {
      this.stack.push(key)
      output += createTag(key, attrs[key])
    })

    return output
  }

  end () {
    const tags = this.stack.reduce((output) => output + CLOSE_TAG, '')
    this.stack.length = 0
    return tags
  }
}

export default Html
