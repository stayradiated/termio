var ansiToHtmlStream = require('./index');

var stream = ansiToHtmlStream();

process.stdin.pipe(stream).pipe(process.stdout);
