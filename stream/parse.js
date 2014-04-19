var _ = require('underscore');
var ReadableStream = require('stream').Readable;
var TransformStream = require('stream').Transform;

var parseStream = function () {
  var stream = TransformStream();

  stream._transform = function (chunk, encoding, done) {
  };

  return stream;
};

var Parse = function (stream) {
};

_.extend(Parse.prototype, {

  replaceAnsi: function (codes) {
    console.log('>>>', codes, '<<<');
    return { type: 'ansi', value: codes };
  },

  replaceText: function (text) {
    return { type: 'text', value: text };
  },

  replaceEscape: function () {
     return { type: 'text', value: 'ESC' };
  },

  tokens: [

    // ansi escape code
    [/^\x1b\[[^@-_]*[@-_]/, 'replaceAnsi'],

    // real text
    [/^([^\x1b]+)/m, 'replaceText'],

    // everything else
    // [/^\x1b/, 'replaceEscape']

  ],

  process: function (name, output) {
    var fn = this[name];
    return function (_, data, index) {
      output.push(fn(_));
      return '';
    };
  },

  write: function (input) {
    var output = [];

    var size;
    while ((size = input.length) > 0) {

      console.log('input', JSON.stringify(input));

      // go through each token in order
      // check if we have a match
      //   if so, replace and start again
      // else
      //   keep going

      for_loop:
      for (var i = 0; i < this.tokens.length; i++) {
        var token = this.tokens[i];
        if (token[0].test(input)) {
          input = input.replace(token[0], this.process(token[1], output));
          break for_loop;
        }
      }

      if (input.length === size) break;
    }

    return output;
  }

});


module.exports = parseStream;
module.exports.Parse = Parse;
