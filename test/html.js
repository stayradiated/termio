var Ansi = require('../ansi');
var html = require('../html');

describe('html', function () {

  it('should export html classes', function () {

    var ansi = new Ansi();
    ansi.set(1);
    ansi.set(3);

    ansi.set(30);
    ansi.set(40);

    console.log(html(ansi.attrs));

  });

});
