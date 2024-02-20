function stateFromHTML(html, options) {
  var parser = options == null || options.parser == null ? _parseHTML2.default : options.parser;
  var element = parser(html);
  return (0, _index.stateFromElement)(element, options);
}