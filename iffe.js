var through = require('through2');

function iffe () {
  var chunks = [];

  return through(function (buffer, encoding, next) {

    var str = buffer.toString('utf8');

    if (!chunks.length) chunks.push('(function(){\n');

    chunks.push(str);
    next();

  }, function (next) {
    chunks.push('}());\n');
    this.push(chunks.join(''));
    next();

  });
}

iffe.sync = iffe;

module.exports = iffe;
