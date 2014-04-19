/*
 * Test that all the streams work together
 *
 * raw text -> [tokenizer] -> [ansi -> [html] -> output
 */

var assert = require('chai').assert;

var htmlStream = require('../stream/html');
var ansiStream = require('../stream/ansi');

describe('stream/pipe', function () {

  var ansi, html, text, _i, tests;

  beforeEach(function () {
    ansi = ansiStream();
    html = htmlStream();
    ansi.pipe(html);
    
    tests = [];
    _i = 0;

    html.on('readable', function () {
      var data = html.read();
      var i = _i++;
      assert.equal(data, tests[i]);
    });
  });

  var test = function (string) {
    tests.push(string);
  };

  it('should handle text styles', function () {

    ansi.write(1);
    test('<span class="bold">');

    ansi.write(3);
    test('<span class="italic">');

    ansi.write(4);
    test('<span class="underline">');

    ansi.write(23);
    test('</span></span><span class="underline">');

    ansi.write(21);
    test('</span></span><span class="underline">');

    ansi.end();
    test('</span>');

  });

  it('should handle foreground/background colors', function () {

    ansi.write(34);
    test('<span class="foreground-4">');

    ansi.write(32);
    test('</span><span class="foreground-2">');

    ansi.write(40);
    test('<span class="background-0">');

    ansi.write(42);
    test('</span><span class="background-2">');

    ansi.write(36);
    test('</span></span><span class="background-2"><span class="foreground-6">');

  });

});
