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

var ORDER = [
  'bold', 'italic', 'underline'
];


var Html = function () {
  this.stack = [];

  // TODO: use a streaming interface instead
  this.output = '';
};

_.extend(Html.prototype, {

  ansi: function (ansi) {

    // get ansi attrs
    var attrs = ansi.attrs();
    var keys = _.chain(attrs).keys().map(function (key) {
      return getName(key, attrs[key]);
    }).value();

    // remove attrs & close spans
    while((excess = _.difference(this.stack, keys)).length) {
      this.stack.pop();
      this.pipe(CLOSE_TAG);
    }

    var missing = _.difference(keys, this.stack).sort(sortKeys);

    // add attrs & create spans
    _.each(missing, function (key) {
      this.stack.push(key);
      this.pipe(createTag(key, attrs[key]));
    }, this);

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

var createTag = function (classname) {
  return '<'+TAG+' '+PROP+'="'+classname+'">';
};

var sortKeys = function (a, b) {
  return ORDER.indexOf(a) - ORDER.indexOf(b);
};

var getName = function (key, value) {
  if (value === true) return key;
  return key + '-' + value;
};

module.exports = Html;
