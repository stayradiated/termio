var Colr = require('colr');

var styles = {
  bold: 'font-weight: bold',
  underline: 'text-decoration: underline',
  italic: 'font-style: italic'
};

for (var red = 0; red < 6; red++) {
  for (var green = 0; green < 6; green++) {
    for (var blue = 0; blue < 6; blue++) {
      var index = 16 + (red * 36) + (green * 6) + blue;
      var r = red   > 0 ? red   * 40 + 55 : 0;
      var g = green > 0 ? green * 40 + 55 : 0;
      var b = blue  > 0 ? blue  * 40 + 55 : 0;
      styles['foreground-' + index]  = 'color:' + Colr.fromRgb(r, g, b).toHex();
      styles['background-' + index]  = 'background-color:' + Colr.fromRgb(r, g, b).toHex();
    }
  }
}

for (var gray = 0; gray < 24; gray++) {
  var index = gray + 232;
  var l = gray * 10 + 8; // luminosity
  styles['foreground-' + index] = 'color:' + Colr.fromGrayscale(l).toHex();
  styles['background-' + index] = 'background-color:' + Colr.fromGrayscale(l).toHex();
}


var css = [
  'body{margin:0;}',
  'pre{font:14px monospace;}',
  '.background-fg{background-color:#e8dfd6;}',
  '.background-bg{background-color:#021b21;}',
  '.foreground-bg{color:#021b21}',
  '.foreground-fg{color:#e8dfd6;}',
  '.foreground-0{color:#08313b;}',
  '.background-0{background-color:#08313b;}',
  '.foreground-1{color:#ac4142;}',
  '.background-1{background-color:#ac4142;}',
  '.foreground-2{color:#90a959;}',
  '.background-2{background-color:#90a959;}',
  '.foreground-3{color:#d28445;}',
  '.background-3{background-color:#d28445;}',
  '.foreground-4{color:#6a9fb5;}',
  '.background-4{background-color:#6a9fb5;}',
  '.foreground-5{color:#aa759f;}',
  '.background-5{background-color:#aa759f;}',
  '.foreground-6{color:#75b5aa;}',
  '.background-6{background-color:#75b5aa;}',
  '.foreground-7{color:#969896;}',
  '.background-7{background-color:#969896;}',
  '.bold .foreground-0, .foreground-0 .bold, .foreground-8{color:#134e5f;}',
  '.background-8{background-color:#134e5f;}',
  '.bold .foreground-1, .foreground-1 .bold, .foreground-9{color:#cc6666;}',
  '.background-9{background-color:#cc6666;}',
  '.bold .foreground-2, .foreground-2 .bold, .foreground-10{color:#b5bd68;}',
  '.background-10{background-color:#b5bd68;}',
  '.bold .foreground-3, .foreground-3 .bold, .foreground-11{color:#f0c674;}',
  '.background-11{background-color:#f0c674;}',
  '.bold .foreground-4, .foreground-4 .bold, .foreground-12{color:#81a2be;}',
  '.background-12{background-color:#81a2be;}',
  '.bold .foreground-5, .foreground-5 .bold, .foreground-13{color:#b294bb;}',
  '.background-13{background-color:#b294bb;}',
  '.bold .foreground-6, .foreground-6 .bold, .foreground-14{color:#8abeb7;}',
  '.background-14{background-color:#8abeb7;}',
  '.bold .foreground-7, .foreground-7 .bold, .foreground-15{color:#c5c8c6;}',
  '.background-15{background-color:#c5c8c6;}\n'
].join('\n');

for (var key in styles) {
  css += '.' + key + '{' + styles[key] + ';}\n';
}

module.exports = css;
