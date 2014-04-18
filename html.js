/*
 * Convert ansi attributes to html
 */

var _ = require('underscore');


/*
 * Constants
 */

var TAG = 'span';
var PROP = 'class';
var PREFIX = 'ansi-';
var CLOSE_TAG = '</' + TAG + '>';

var Html = function () {
  this.stack = [];

  // TODO: use a streaming interface instead
  this.output = '';
};

_.extend(Html.prototype, {

  ansi: function (ansi) {
    var attrs = ansi.attrs();

    // check attrs
    var keys = _.keys(attrs);

    var missing = _.difference(keys, this.stack);
    var excess = _.difference(this.stack, keys);

    console.log({
      keys: keys,
      missing: missing, 
      excess: excess
    });

    // check stack

    // remove attrs & close spans
    if (excess.length) {
      this.stack.pop();
      this.pipe(CLOSE_TAG);
    }
    
    // add attrs & create spans
    _.each(missing, function (key) {
      this.stack.push(key);
      this.pipe(createTag(key, attrs[key]));
    }, this);

    console.log(this.stack);

  },

  text: function (text) {
    this.pipe(text);
  },

  pipe: function (text) {
    this.output += text;
  },

  end: function () {
    _.each(this.stack, function () {
      this.pipe(CLOSE_TAG);
    }, this);
  }

});



/*
 * Convert a single ansi attribute into an html tag
 *
 * - key (string)
 * - value (boolean|string|number)
 */

var createTag = function (key, value) {
  var output = key;

  if (value !== true) {
    output += '-' + value;
  }

  return '<'+TAG+' '+PROP+'="'+output+'">';
};

module.exports = Html;
