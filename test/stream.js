/*
 * Test that all the streams work together
 *
 * raw text -> [tokenizer] -> [ansi -> [html] -> output
 */

var _ = require('underscore');
var assert = require('chai').assert;

var htmlStream = require('../lib/html');
var ansiStream = require('../lib/ansi');

describe('stream/pipe', function () {

  var ansi, html, text, _i, _closed, _onClose, tests;

  beforeEach(function () {
    ansi = ansiStream();
    html = htmlStream();
    ansi.pipe(html);
    
    tests = [];
    _i = 0;
    _closed = false;
    _onClose = _.identity;

    html.on('data', function (data) {
      var i = _i++;
      assert.equal(data, tests[i]);
    });

    html.on('end', function () {
      _closed = true;
      _onClose();
    });

  });

  afterEach(function (done) {
    _onClose = done;
    if (_closed) done();
  });

  var test = function (string) {
    if (_.isArray(string)) string = string.join('');
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

    ansi.end();
    test('</span></span>');

  });

  it('should handle reverse video', function () {

    ansi.write(7);
    ansi.write(31);
    ansi.write(107);
    ansi.write(27);
    ansi.end();

    test(['<span class="reverse">',
            '<span class="foreground-bg">',
              '<span class="background-fg">']);
    test([    '</span>',
              '<span class="background-1">']);
    test([    '</span>',
            '</span>',
            '<span class="background-1">',
              '<span class="foreground-15">']);
    test([    '</span>',
            '</span>',
          '</span>',
          '<span class="background-15">',
            '<span class="foreground-1">']);
    test([  '</span>',
          '</span>']);

  });

});
