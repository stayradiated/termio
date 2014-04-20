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

// for (var i = 0; i < 36; i++) {
//   var code = (group * 36) + (16 + i);
//   line += esc([48, 5, code]) + ' ' + code + ' ' + esc(0);
//   if (i % 6 === 5) {
//     console.log(line);
//     line = '';
//   }
// }
// console.log(' ');

var line = '';
for (var column = 0; column < 6; column++) {
  for (var row = 0; row < 6; row++) {
    for (var group = 0; group < 6; group++) {
      var color = (group * 36) + 16 + (row * 6) + column;
      line += esc([48, 5, color]) + pad(color) + esc(0);
    }
  }
  line += '\n';
}
console.log(line);
