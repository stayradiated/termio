var SPACE = '  ';

var esc = function (x) {
  return '\x1b[' + x + 'm';
};

var color = function (i) {
  if (i < 8) return esc(i + 40);
  return esc(i + 92);
};

var ROW = [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15];
ROW = ROW.slice(0, -1).concat(ROW.reverse());

for (var row = 0; row < 16; row++) {
  var line = '';
  for (var col = 0; col < 16; col++) {
    var i = col + row;
    line += color(ROW[i]) + SPACE + esc(0);
  }
  console.log(line);
}
