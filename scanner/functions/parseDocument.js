function parseDocument(data, options) {
  var handler = new domhandler_1.DomHandler(undefined, options);
  new Parser_1.Parser(handler, options).end(data);
  return handler.root;
}