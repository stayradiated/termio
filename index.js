var tinycolor = require('tinycolor2');

var STYLES = {};

var COLORS = [
  'black', 'red', 'green', 'yellow' , 'blue', 'magenta', 'cyan' , 'white'
];

for (var red = 0; red < 6; red++) {
  for (var green = 0; green < 6; green++) {
    for (var blue = 0; blue < 6; blue++) {
      var index = 16 + (red * 36) + (green * 6) + blue;
      var r = red   > 0 ? red   * 40 + 55 : 0;
      var g = green > 0 ? green * 40 + 55 : 0;
      var b = blue  > 0 ? blue  * 40 + 55 : 0;
      STYLES['fg-' + index]  = 'color: ' + tinycolor({r:r,g:g,b:b}).toHexString();
      STYLES['bg-' + index]  = 'background-color: ' + tinycolor({r:r,g:g,b:b}).toHexString();
    }
  }
}

for (var gray = 0; gray < 24; gray++) {
  var index = gray + 232;
  var l = gray * 10 + 8; // luminosity
  STYLES['fg-' + index] = 'color: ' + tinycolor({r:l,g:l,b:l}).toHexString();
  STYLES['bg-' + index] = 'background-color: ' + tinycolor({r:l,g:l,b:l}).toHexString();
}

console.log(STYLES);

var tokenize = function () {

  var tokens = [

    // characters to remove completely
    [/^\x08+/, remove],

    // set custom foreground/background color
    [/^\x1b\[38;5;(\d+)m/, ]
    [/^\x1b\[48;5;(\d+)m/, ]

    // ansi escape sequences that mess with the display
    [/^\A\x1b\[((:?\d{1,3};?+|)m/, function (m) {
    })

  ];

};
