import { shallowEqual } from 'fast-equals'

const ATTRIBUTES = {
  bold: false,
  underline: false,
  italic: false,
  background: 'bg',
  foreground: 'fg',
  conceal: false,
  strike: false,
  reverse: false
}

class Ansi {
  constructor () {
    this._attrs = {}
    this._foreground = 0
    this._background = 0
    this.reset()
  }

  /*
   * ansi.prototype.write
   *
   * map a number to an attribute
   * based on http://en.wikipedia.org/wiki/ansi_escape_code
   *
   * - value (number) : escape code number
   */

  write (value) {
    if (this._foreground > 1) {
      this.set('foreground', value)
      this._foreground = 0
      return this
    }

    if (this._background > 1) {
      this.set('background', value)
      this._background = 0
      return this
    }

    if (value === 5) {
      if (this._foreground === 1) {
        this._foreground = 2
        return this
      } else if (this._background === 1) {
        this._background = 2
        return this
      }
    }

    switch (value) {
      case 0: this.reset(); break
      case 1: this.set('bold', true); break
      case 3: this.set('italic', true); break
      case 4: this.set('underline', true); break
      case 7: this.set('reverse', true); break
      case 8: this.set('conceal', true); break
      case 9: this.set('strike', true); break

      case 21: this.reset('bold'); break
      case 22: this.reset('bold'); break
      case 23: this.reset('italic'); break
      case 24: this.reset('underline'); break
      case 27: this.reset('reverse'); break
      case 28: this.reset('conceal'); break
      case 29: this.reset('strike'); break

      case 38: this._foreground = 1; break
      case 39: this.reset('foreground'); break
      case 48: this._background = 1; break
      case 49: this.reset('background'); break

      default:
        if (value >= 30 && value <= 37) {
          this.set('foreground', value - 30)
        } else if (value >= 40 && value <= 47) {
          this.set('background', value - 40)
        } else if (value >= 90 && value <= 97) {
          this.set('foreground', value - 82)
        } else if (value >= 100 && value <= 107) {
          this.set('background', value - 92)
        }
    }
    return this
  }

  /*
   * ansi.prototype.set
   *
   * set an attributes value
   *
   * - attr (string) : name of the attribute
   * - value (boolean|string|number) : value of the attribute
   */

  set (attr, value) {
    this._attrs[attr] = value
    return this
  }

  /*
   * ansi.prototype.reset
   *
   * set all attribute values to false
   *
   * - [attr] (string) : optional. only reset that attribute.
   */

  reset (attr) {
    if (attr) {
      this._attrs[attr] = ATTRIBUTES[attr]
    } else {
      this._attrs = Object.assign({}, ATTRIBUTES)
    }
    return this
  }

  /*
   * ansi.prototype.attrs
   *
   * get the enabled ansi attributes.
   * (.e.g. only the ones that have a non-false value)
   *
   * > object
   */

  attrs () {
    const output = {}
    for (const attr in ATTRIBUTES) {
      const defaultval = ATTRIBUTES[attr]
      const value = this._attrs[attr]
      if (value !== defaultval) {
        output[attr] = value
      }
    }

    if (output.reverse) {
      output.foreground = this._attrs.background
      output.background = this._attrs.foreground
    }

    return output
  }
}

export default Ansi
