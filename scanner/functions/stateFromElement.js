function stateFromElement(element, options) {
  var blocks = new BlockGenerator(options).process(element);
  return _draftJs.ContentState.createFromBlockArray(blocks);
}