function createTypeLink(type) {
  var text = '';
  if (type) {
    var aliases = type.split('|');
    var result = [];
    aliases.forEach(function(alias) {
      result.push(new Link().toSymbol(alias).toString());
    });
    text = result.join('/');
  } else {
    text = 'unknown';
  }
  return '<span class="jsdoc-typedesc">' + text + '</span>';
}