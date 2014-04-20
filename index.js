var _ = require('underscore');
var util = require('util');
var Stream = require('stream');
var Splinter = require('splinter');
var through = require('through');

var ansiStream = require('./stream/ansi');
var htmlStream = require('./stream/html');
var tokenStream = require('./stream/token');

var ansiToHtmlStream = function () {
  var stream = Stream.Transform({ objectMode: true });

  var ansi = ansiStream();
  var html = htmlStream();
  var token = tokenStream();

  var splinter = Splinter(function (chunk) {
    return chunk.type;
  });

  var textOutput = splinter.match('text').pipe(through(function (chunk) {
    this.queue(_.escape(chunk.value));
  })).on('data', function (data) {
    stream.push(data);
  });
  
  splinter.match('ansi').pipe(through(function (chunk) {
    this.queue(chunk.value);
  })).pipe(ansi).pipe(html).on('data', function (data) {
    stream.push(data);
  });

  token.pipe(splinter);

  stream._transform = function (chunk, encoding, done) {
    token.write(chunk);
    done();
  };

  stream.push('<head><meta charset="utf-8"><style>body{margin:0}.background-bg{background:#021b21;}.foreground-fg{color:#e8dfd6;}.foreground-0{color:#08313b;}.background-0{background:#08313b;}.foreground-1{color:#ac4142;}.background-1{background:#ac4142;}.foreground-2{color:#90a959;}.background-2{background:#90a959;}.foreground-3{color:#d28445;}.background-3{background:#d28445;}.foreground-4{color:#6a9fb5;}.background-4{background:#6a9fb5;}.foreground-5{color:#aa759f;}.background-5{background:#aa759f;}.foreground-6{color:#75b5aa;}.background-6{background:#75b5aa;}.foreground-7{color:#969896;}.background-7{background:#969896;}.bold.foreground-0,.foreground-8{color:#134e5f;}.background-8{background:#134e5f;}.bold.foreground-1,.foreground-9{color:#cc6666;}.background-9{background:#cc6666;}.bold.foreground-2,.foreground-10{color:#b5bd68;}.background-10{background:#b5bd68;}.bold.foreground-3,.foreground-11{color:#f0c674;}.background-11{background:#f0c674;}.bold.foreground-4,.foreground-12{color:#81a2be;}.background-12{background:#81a2be;}.bold.foreground-5,.foreground-13{color:#b294bb;}.background-13{background:#b294bb;}.bold.foreground-6,.foreground-14{color:#8abeb7;}.background-14{background:#8abeb7;}.bold.foreground-7,.foreground-15{color:#c5c8c6;}.background-15{background:#c5c8c6;}');

stream.push(require('./css'));

stream.push('</style></head><body class="background-bg foreground-fg"><pre>');

  return stream;
};

module.exports = ansiToHtmlStream;
