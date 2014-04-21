var assert = require('chai').assert;
var log = require('log_')('html', 'green');
var _ = require('underscore');
var htmlStream = require('../lib/html');

describe('stream/html', function () {

  describe('#class', function () {

    var html, _textLast, _textTotal;

    beforeEach(function () {
      html = new htmlStream.Html();
      _textLast = '';
      _textTotal = '';
    });

    var end = function () {
      var output = html.end();
      _textLast = output;
      _textTotal += output;
      return output;
    };

    var write = function (obj) {
      var output = html.write(obj);
      _textLast = output;
      _textTotal += output;
      return output;
    };

    var test = function (expected, actual) {
      if (_.isArray(expected)) expected = expected.join('');
      assert.equal(actual !== undefined ? actual : _textLast, expected);
    };

    var testAll = function (string) {
      test(string, _textTotal);
    };

    it('should export html classes', function () {

      // nothing
      write({});
      test('');

      // bold
      write({ bold: true });
      test('<span class="bold">');

      // italic
      write({ bold: true, italic: true });
      test('<span class="italic">');

      // underline
      write({ bold: true, italic: true, underline: true });
      test('<span class="underline">');

      // remove underline
      write({ bold: true, italic: true });
      test('</span>');

      // remove bold
      write({italic: true });
      test('</span></span><span class="italic">');

      // remove italic
      write({});
      test('</span>');

      // close any open spans
      end();
      test('');

    });

    it('should add multiple attributse', function () {

      write({
        bold: true,
        italic: true,
        underline: true
      });

      end();

      testAll([
        '<span class="bold">',
          '<span class="italic">',
            '<span class="underline"></span>',
          '</span>',
        '</span>'
      ]);

    });

    it('should handle foreground/background colors', function () {

      write({ foreground: 1 });
      write({ foreground: 2 });
      write({ foreground: 2, background: 8 });
      write({ foreground: 2, background: 9 });
      write({ foreground: 3, background: 9 });
      end();

      testAll([
        '<span class="foreground-1"></span>',
        '<span class="foreground-2">',
          '<span class="background-8"></span>',
          '<span class="background-9"></span>',
        '</span>',
        '<span class="foreground-3">',
          '<span class="background-9"></span>',
        '</span>'
      ]);

    });

    it('should handle reverse video', function () {
      write({ reverse: true });
      write({ reverse: true, background: 2 });
      write({ reverse: true, background: 2, foreground: 7 });
      write({ background: 2, foreground: 7 });
      end();

      testAll([
        '<span class="reverse">',
          '<span class="background-2">',
            '<span class="foreground-7"></span>',
          '</span>',
        '</span>',
        '<span class="background-2">',
          '<span class="foreground-7"></span>',
        '</span>'
      ]);
    });

  });

  describe('#stream', function () {

    var html;

    beforeEach(function () {
      html = htmlStream();
    });

    afterEach(function () {
      html.end();
    });

    var test = function (string) {
      assert.deepEqual(html.read(), string);
    };

    it('should output spans', function () {

      html.write({ bold: true });
      test('<span class="bold">');

      html.write({ italic: true });
      test('</span><span class="italic">');

      html.write({ underline: true });
      test('</span><span class="underline">');

      html.end();
      test('</span>');

    });

  });

});
