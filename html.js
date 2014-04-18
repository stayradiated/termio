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
var CLOSE = '</' + TAG + '>';


var Html = function () {
  this.stack = [];

  // TODO: use a streaming interface instead
  this.output = '';
};

_.extend(Html.prototype, {

  ansi: function (attrs) {

    // check attrs

    // check stack

    // remove attrs & close spans
    
    // add attrs & create spans

  },

  text: function (text) {
    this.pipe(text);
  },

  pipe: function (text) {
    this.output += text;
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
