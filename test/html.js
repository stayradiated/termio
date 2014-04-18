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

    // close spans
    html.end();
    console.log(html.output);

  });

});
