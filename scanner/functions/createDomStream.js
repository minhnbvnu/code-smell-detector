function createDomStream(cb, options, elementCb) {
  var handler = new domhandler_1.DomHandler(cb, options, elementCb);
  return new Parser_1.Parser(handler, options);
}