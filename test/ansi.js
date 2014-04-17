var Ansi = require('../ansi');
var _ = require('underscore');
var assert = require('chai').assert;

var STYLES = [ null,
  'bold', null, 'italic', 'underline', null, null, 'reverse', 'conceal', 'strike'
];

var COLORS = [
  'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'
];


describe('ansi', function () {
  
  var ansi;

  beforeEach(function () {
    ansi = new Ansi();
  });

  var test = function (options) {
    var defaults = {
      bold:       false,
      underline:  false,
      italic:     false,
      background: false,
      foreground: false,
      conceal:    false,
      strike:     false,
      reverse:    false
    };
    _.extend(defaults, options);
    assert.deepEqual(defaults, ansi.attrs);
  };

  describe('reset', function () {

    it('default styles', function () {
      test();
    });

    it('reset styles', function () {
      ansi.set(1);
      ansi.set(3);
      ansi.set(4);
      ansi.set(7);
      ansi.set(8);
      ansi.set(9);
      ansi.set(30);
      ansi.set(40);

      test({
        bold: true,
        italic: true,
        underline: true,
        strike: true,
        reverse: true,
        conceal: true,
        background: 0,
        foreground: 0
      });

      ansi.set(0);

      test();
    });

  });

  describe('text styles', function () {

    _.each(STYLES, function (style, i) {
      if (style === null) return;
      
      var options = {};
      options[style] = true;

      it(i + ': ' + style, function () {
        ansi.set(i);
        test(options);
      });
    });

  });

  describe('reset text styles', function () {

    _.each(STYLES, function (style, i) {
      if (style === null) return;

      var code = 20 + i;

      it(code + ': ' + style, function () {
        ansi.set(i);
        ansi.set(code);
        test();
      });
    });

  });

  describe('foreground', function () {

    _.range(0, 8).forEach(function (i) {
      var code = i + 30;
      it(code + ': ' + COLORS[i], function () {
        ansi.set(code);
        test({foreground: i});
      });
    });

  });

  describe('background', function () {

    _.range(0, 8).forEach(function (i) {
      var code = i + 40;
      it(code + ': ' + COLORS[i], function () {
        ansi.set(code);
        test({background: i});
      });
    });

  });

  describe('bright foreground', function () {

    _.range(0, 8).forEach(function (i) {
      var code = i + 90;
      it(code + ': bright ' + COLORS[i], function () {
        ansi.set(code);
        test({foreground: i + 8});
      });
    });

  });

  describe('bright background', function () {

    _.range(0, 8).forEach(function (i) {
      var code = i + 100;
      it(code + ': bright ' + COLORS[i], function () {
        ansi.set(code);
        test({background: i + 8});
      });
    });

  });

});
