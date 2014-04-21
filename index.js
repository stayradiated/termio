var _ = require('underscore');
var util = require('util');
var Stream = require('stream');
var Splinter = require('splinter');
var through = require('through');

var ansiStream = require('./lib/ansi');
var htmlStream = require('./lib/html');
var tokenStream = require('./lib/token');

var termioStream = function () {
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

  return stream;
};

module.exports = termioStream;
