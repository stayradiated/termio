var _ = require('underscore');

var TransformStream = require('stream').Transform;

var ATTRIBUTES = {
  bold: false,
  underline: false,
  italic: false,
  background: 'bg',
  foreground: 'fg',
  conceal: false,
  strike: false,
  reverse: false
};


/*
 * Create Ansi Stream
 *
 * Create a new transform stream.
 *
 * write: numbers, or arrays of numbers
 * read: ansi attributes
 */

var createAnsiStream = function () {

  var ansi = new Ansi();
  var stream = new TransformStream({objectMode: true});
  var last = {};

  stream._transform = function (chunk, encoding, done) {
    if (! _.isArray(chunk)) chunk = [chunk];
    _.each(chunk, ansi.write, ansi);

    var attrs = ansi.attrs();
    if (! _.isEqual(attrs, last)) {
      last = attrs;
      stream.push(attrs);
    }

    done();
  };

  return stream;
};


var Ansi = function () {
  this._attrs = {};
  this._foreground = 0;
  this._background = 0;
  this.reset();
};

_.extend(Ansi.prototype, {


  /*
   * Ansi.prototype.write
   *
   * Map a number to an attribute
   * Based on http://en.wikipedia.org/wiki/ANSI_escape_code
   *
   * - value (number) : escape code number
   */

  write: function (value) {

    if (this._foreground > 1) {
      this.set('foreground', value);
      this._foreground = 0;
      return this;
    }

    if (this._background > 1) {
      this.set('background', value);
      this._background = 0;
      return this;
    }

    if (value === 5) {
      if (this._foreground === 1) {
        this._foreground = 2;
        return this;
      }
      else if (this._background === 1) {
        this._background = 2;
        return this;
      }
    }

    switch (value) {

      case 0: this.reset();                   break;
      case 1: this.set('bold', true);         break;
      case 3: this.set('italic', true);       break;
      case 4: this.set('underline', true);    break;
      case 7: this.set('reverse', true);      break;
      case 8: this.set('conceal', true);      break;
      case 9: this.set('strike', true);       break;

      case 21: this.reset('bold');            break;
      case 22: this.reset('bold');            break;
      case 23: this.reset('italic');          break;
      case 24: this.reset('underline');       break;
      case 27: this.reset('reverse');         break;
      case 28: this.reset('conceal');         break;
      case 29: this.reset('strike');          break;

      case 38: this._foreground = 1;          break;
      case 39: this.reset('foreground');      break;
      case 48: this._background = 1;          break;
      case 49: this.reset('background');      break;

      default:
        if (value >= 30 && value <= 37) {
          this.set('foreground', value - 30);
        }
        else if (value >= 40 && value <= 47) {
          this.set('background', value - 40);
        }
        else if (value >= 90 && value <= 97) {
          this.set('foreground', value - 82);
        }
        else if (value >= 100 && value <= 107) {
          this.set('background', value - 92);
        }

    }
    return this;
  },


  /*
   * Ansi.prototype.set
   *
   * Set an attributes value
   *
   * - attr (string) : name of the attribute
   * - value (boolean|string|number) : value of the attribute
   */

  set: function (attr, value) {
    this._attrs[attr] = value;
    return this;
  },


  /*
   * Ansi.prototype.reset
   *
   * Set all attribute values to false
   *
   * - [attr] (string) : optional. only reset that attribute.
   */

  reset: function (attr) {
    if (attr) {
      this._attrs[attr] = ATTRIBUTES[attr];
    } else {
      this._attrs = _.clone(ATTRIBUTES);
    }
    return this;
  },


  /*
   * Ansi.prototype.attrs
   * 
   * Get the enabled ansi attributes.
   * (.e.g. only the ones that have a non-false value)
   *
   * > object
   */

  attrs: function () {
    var output = {};
    _.each(ATTRIBUTES, function (defaultVal, attr) {
      var value = this._attrs[attr];
      if (value !== defaultVal) output[attr] = value;
    }, this);

    if (output.reverse) {
      output.foreground = this._attrs.background;
      output.background = this._attrs.foreground;
    }

    return output;
  }

});


module.exports = createAnsiStream;
module.exports.Ansi = Ansi;
