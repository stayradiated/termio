var _ = require('underscore');

var esc = function (num) {
  if (_.isArray(num)) num = num.join(';');
  return '\x1b[' + num + 'm';
};

var pad = function (num) {
  num = num.toString();
  var len = 3 - num.length;
  var spaces = Array(len + 1).join(' ');
  return ' ' + num + spaces + ' ';
};

var line, color;
var SPACE = '   ';

console.log('\nMain Colors:');

line = '';
for (var row = 0; row < 2; row++) {
  for (var i = 0; i < 8; i++) {
    line += esc([48, 5, i + (row * 8)]) + SPACE + esc(0);
  }
  console.log(line + '\n' + line);
  line = '';
}

console.log('\nColor Cubes:');

line = '';
for (var row = 0; row < 6; row++) {
  for (var group = 0; group < 6; group++) {
    for (var column = 0; column < 6; column++) {
      color = (group * 36) + 16 + (row * 6) + column;
      line += esc([48, 5, color]) + SPACE + esc(0);
    }
  }
  console.log(line + '\n' + line);
  line = '';
}

console.log('\nShades:');

line = '';
for (var shade = 0; shade < 24; shade++) {
  color = shade + 232;
  line += esc([48, 5, color]) + SPACE + esc(0);    
}
console.log(line + '\n' + line);
