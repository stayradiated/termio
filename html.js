/*
 * Convert ansi attributes to html
 */

var _ = require('underscore');

var PREFIX = 'ansi-';

var html = function (ansi) {
  var output = '';

  _.each(ansi, function (value, key) {
    if (value === false) return;

    output += key;
    if (value !== true) {
      output += '-' + value;
    }

    output += ' ';
  });

  return '<span class="' + output.slice(0, -1) + '">';
};

module.exports = html;
