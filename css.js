var tinycolor = require('tinycolor2');

var styles = {};

for (var red = 0; red < 6; red++) {
  for (var green = 0; green < 6; green++) {
    for (var blue = 0; blue < 6; blue++) {
      var index = 16 + (red * 36) + (green * 6) + blue;
      var r = red   > 0 ? red   * 40 + 55 : 0;
      var g = green > 0 ? green * 40 + 55 : 0;
      var b = blue  > 0 ? blue  * 40 + 55 : 0;
      styles['foreground-' + index]  = 'color:' + tinycolor({r:r,g:g,b:b}).toHexString();
      styles['background-' + index]  = 'background-color:' + tinycolor({r:r,g:g,b:b}).toHexString();
    }
  }
}

for (var gray = 0; gray < 24; gray++) {
  var index = gray + 232;
  var l = gray * 10 + 8; // luminosity
  styles['foreground-' + index] = 'color:' + tinycolor({r:l,g:l,b:l}).toHexString();
  styles['background-' + index] = 'background-color:' + tinycolor({r:l,g:l,b:l}).toHexString();
}


var css = '';

for (var key in styles) {
  css += '.' + key + '{' + styles[key] + '}';
}

module.exports = css;
