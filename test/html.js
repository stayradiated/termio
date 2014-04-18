var assert = require('chai').assert;
var log = require('log_')('html', 'green');
var _ = require('underscore');

describe('html', function () {

  var Ansi = require('../ansi');
  var Html = require('../html');

  var ansi, html, _totalOutput;

  beforeEach(function () {
    ansi = new Ansi();
    html = new Html();
    _totalOutput = '';
  });

  var test = function (string) {
    if (_.isArray(string)) string = string.join('');
    _totalOutput += string;
    assert.equal(html.output, _totalOutput);
  };

  it('should export html classes', function () {

    // nothing
    html.ansi(ansi);
    html.text('plain');
    test('plain');

    // bold
    ansi.set(1);
    html.ansi(ansi);
    html.text('bold');
    test('<span class="bold">bold');

    // italic
    ansi.set(3);
    html.ansi(ansi);
    html.text('bold/italic');
    test('<span class="italic">bold/italic');

    // underline
    ansi.set(4);
    html.ansi(ansi);
    html.text('bold/italic/underline');
    test('<span class="underline">bold/italic/underline');

    // remove underline
    ansi.set(24);
    html.ansi(ansi);
    html.text('bold/italic');
    test('</span>bold/italic');

    // remove bold
    ansi.set(21);
    html.ansi(ansi);
    html.text('italic');
    test('</span></span><span class="italic">italic');

    // remove italic
    ansi.set(23);
    html.ansi(ansi);
    html.text('plain');
    test('</span>plain');

    // close spans
    html.end();

  });

  it('should add multiple attributse', function () {

    ansi.set(1); // bold
    ansi.set(3); // italic
    ansi.set(4); // underline

    html.ansi(ansi);
    html.text('bold/italic/underline');
    html.end();

    test([
      '<span class="bold">',
        '<span class="italic">',
          '<span class="underline">',
            'bold/italic/underline',
          '</span>',
        '</span>',
      '</span>'
    ]);

  });

  it('should handle foreground/background colors', function () {

    ansi.set(31);
    html.ansi(ansi);
    html.text('red text');

    ansi.set(32);
    html.ansi(ansi);
    html.text('green text');

    ansi.set(40);
    html.ansi(ansi);
    html.text('green text with a black background');

    ansi.set(44);
    html.ansi(ansi);
    html.text('green text with a blue background');

    html.end();

    test([
      '<span class="foreground-1">red text</span>',
      '<span class="foreground-2">green text',
        '<span class="background-0">green text with a black background</span>',
        '<span class="background-4">green text with a blue background</span>',
      '</span>'
    ]);

  });

});
