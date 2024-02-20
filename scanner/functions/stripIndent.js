function stripIndent(str) {
  var match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) {
    return str;
  }

  var indent = Math.min.apply(Math, match.map(function (x) {
    return x.length;
  }));

  if (indent === 0) {
    return str;
  }

  var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
  return str.replace(re, '');
}