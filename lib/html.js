/*
 * Convert ansi attributes to html
 */

var _ = require('underscore');
var TransformStream = require('stream').Transform;


/*
 * Constants
 */

var TAG = 'span';
var PROP = 'class';
var CLOSE_TAG = '</' + TAG + '>';

var ATTR_ORDER = [
  'bold', 'italic', 'underline', 'background', 'foreground'
];


var createHtmlStream = function () {
  var html = new Html();
  var stream = new TransformStream({ objectMode: true });

  stream._transform = function (chunk, encoding, done) {
    stream.push(html.write(chunk));
    done();
  };

  stream._flush = function (done) {
    stream.push(html.end());
    done();
  };

  return stream;
};


var Html = function () {
  this.stack = [];
};


_.extend(Html.prototype, {

  write: function (attrs) {
    var output = '';

    // get ansi attrs
    var keys = _.keys(attrs).map(function (key) {
      return getName(key, attrs[key]);
    });

    // remove attrs & close spans
    while((excess = _.difference(this.stack, keys)).length) {
      this.stack.pop();
      output += CLOSE_TAG;
    }

    // get missing keys
    var missing = _.chain(keys)
      .difference(this.stack)
      .sortBy(ATTR_ORDER.indexOf, ATTR_ORDER)
      .value();

    // add attrs & create spans
    _.each(missing, function (key) {
      this.stack.push(key);
      output += createTag(key, attrs[key]);
    }, this);

    return output;
  },

  end: function () {
    var tags = _.reduce(this.stack, function (output) {
      return output += CLOSE_TAG;
    }, '');
    this.stack.length = 0;
    return tags;
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


/*
 * Convert an attribute key,value pair into a string
 *
 * - key (string)
 * - value
 * > string
 */

var getName = function (key, value) {
  if (value === true) return key;
  return key + '-' + value;
};


module.exports = createHtmlStream;
module.exports.Html = Html;
