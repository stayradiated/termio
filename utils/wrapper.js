var before = [
  '<!doctype html>',
  '<html>',
    '<head>',
      '<meta charset="utf-8">',
      '<style type="text/css">{{ CSS }}</style>',
    '</head>',
    '<body class="background-bg foreground-fg">',
      '<pre>'
].join('');

var after = [
      '</pre>',
    '</body>',
  '</html>\n'
].join('');

module.exports = {
  before: before.replace('{{ CSS }}', require('./css')),
  after: after
};
