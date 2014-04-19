var _ = require('underscore');

var TransformStream = require('stream').Transform;

var ATTRIBUTES   =       [
  'bold', 'underline', 'italic', 'background', 'foreground', 'conceal', 'strike', 'reverse'
];


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

  stream._transform = function (chunk, encoding, done) {
    if (! _.isArray(chunk)) chunk = [chunk];
    _.each(chunk, ansi.write, ansi);
    stream.push(ansi.attrs());
    done();
  };

  return stream;
};


var Ansi = function () {
  this._attrs = {};
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
    switch (value) {

      case 0: this.reset();                   break;
      case 1: this.set('bold', true);         break;
      case 3: this.set('italic', true);       break;
      case 4: this.set('underline', true);    break;
      case 7: this.set('reverse', true);      break;
      case 8: this.set('conceal', true);      break;
      case 9: this.set('strike', true);       break;

      case 21: this.set('bold', false);       break;
      case 22: this.set('bold', false);       break;
      case 23: this.set('italic', false);     break;
      case 24: this.set('underline', false);  break;
      case 27: this.set('reverse', false);    break;
      case 28: this.set('conceal', false);    break;
      case 29: this.set('strike', false);     break;

      case 39: this.set('foreground', false); break;
      case 49: this.set('background', false); break;

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
   */

  reset: function () {
    _.each(ATTRIBUTES, function (attr) {
      this._attrs[attr] = false;
    }, this);
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
    _.each(ATTRIBUTES, function (attr) {
      var value = this._attrs[attr];
      if (value !== false) output[attr] = value;
    }, this);
    return output;
  }

});


module.exports = createAnsiStream;
module.exports.Ansi = Ansi;
