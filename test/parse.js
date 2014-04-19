/* LET'S DO THIS */

var assert = require('chai').assert;
var parseStream = require('../stream/parse');

describe('stream/parse', function () {

  describe('#function', function () {

    var parse;

    beforeEach(function () {
      parse = new parseStream.Parse();
    });

    it('should do stuff', function () {
      var input = 'plain \x1b[32m red \x1b[0m';
      var output = parse.write(input);
      console.log('>>>', JSON.stringify(output, null, 2));
    });

  });

  describe('#stream', function () {

    var parse;

    beforeEach(function () {
      parse = parseStream();
    });

    it('convert input', function () {
      var input = '\x1b[30;m';
    });

  });

});
