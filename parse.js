var _ = require('underscore');

var TEXT = 1;
var ANSI = 2;

var escapeAnsi = function (m) {
  if (m.trim().length) m = '0';
  // remove trailing semicolon if present
  if (m[m.length - 1] === ';') m = m.slice(0, -1);
  _.each(m.split(';'), function (code) {
    console.log(code);
  });
};

var tokens = [
  // characters to remove
  [/^\x08+/, ''],

  // set foreground/background
  [/^\x1b\[38;5;(\d+)m/, setForeground],
  [/^\x1b\[48;5;(\d+)m/, setBackground],

  // escape codes
  [/^\x1b\[((?:\d{1,3};?)+|)m/, escapeAnsi],

  // malformed sequences
  [/^\x1b\[?[\d;]{0,3}/, ''],

  // real text
  [/^([^\x1b\x08]+)/m, text]
];

var len = tokens.length;

while ((size = text.size) > 0) {
  for (var i = 0; i < len; i++) {
    var pattern = tokens[i][0];
    var replace = tokens[i][1];
  }
  if (text.size === size) break;
}

