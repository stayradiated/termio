var _ = require('underscore');
var assert = require('chai').assert;
var ansiStream = require('../stream/ansi');

var STYLES = [ null,
  'bold', null, 'italic', 'underline', null, null, 'reverse', 'conceal', 'strike'
];

var COLORS = [
  'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'
];


describe('stream/ansi', function () {

  describe('#class', function () {
  
    var ansi;

    beforeEach(function () {
      ansi = new ansiStream.Ansi();
    });

    var test = function (attrs) {
      assert.deepEqual(ansi.attrs(), attrs || {});
    };

    describe('reset', function () {

      it('default styles', function () {
        test();
      });

      it('reset styles', function () {
        ansi.write(1);
        ansi.write(3);
        ansi.write(4);
        ansi.write(7);
        ansi.write(8);
        ansi.write(9);
        ansi.write(30);
        ansi.write(40);

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

        ansi.write(0);

        test();
      });

    });

    describe('text styles', function () {

      _.each(STYLES, function (style, i) {
        if (style === null) return;
        
        var options = {};
        options[style] = true;

        it(i + ': ' + style, function () {
          ansi.write(i);
          test(options);
        });
      });

    });

    describe('reset text styles', function () {

      _.each(STYLES, function (style, i) {
        if (style === null) return;

        var code = 20 + i;

        it(code + ': ' + style, function () {
          ansi.write(i);
          ansi.write(code);
          test();
        });
      });

    });

    describe('foreground', function () {

      _.range(0, 8).forEach(function (i) {
        var code = i + 30;
        it(code + ': ' + COLORS[i], function () {
          ansi.write(code);
          test({foreground: i});
        });
      });

    });

    describe('background', function () {

      _.range(0, 8).forEach(function (i) {
        var code = i + 40;
        it(code + ': ' + COLORS[i], function () {
          ansi.write(code);
          test({background: i});
        });
      });

    });

    describe('bright foreground', function () {

      _.range(0, 8).forEach(function (i) {
        var code = i + 90;
        it(code + ': bright ' + COLORS[i], function () {
          ansi.write(code);
          test({foreground: i + 8});
        });
      });

    });

    describe('bright background', function () {

      _.range(0, 8).forEach(function (i) {
        var code = i + 100;
        it(code + ': bright ' + COLORS[i], function () {
          ansi.write(code);
          test({background: i + 8});
        });
      });

    });

    describe('should support 256 colors', function () {

      it('foreground', function () {
        _.range(0, 256).forEach(function (i) {
          ansi.write(38);
          ansi.write(5);
          ansi.write(i);
          test({ foreground: i });
        });
      });

      it('background', function () {
        _.range(0, 256).forEach(function (i) {
          ansi.write(48);
          ansi.write(5);
          ansi.write(i);
          test({ background: i });
        });
      });

    });

  });

  describe('#stream', function () {
    
    var ansi;

    beforeEach(function () {
      ansi = ansiStream();
    });

    afterEach(function () {
      ansi.end();
    });

    var test = function (attrs) {
      assert.deepEqual(ansi.read(), attrs || {});
    };

    it('should be able to write to stream', function () {
      ansi.write(1);
      test({
        bold: true
      });
    });

    it('should write multiple values to the stream in an array', function () {
      ansi.write([1, 3, 4]);
      test({
        bold: true,
        italic: true,
        underline: true
      });
    });

  });

});
