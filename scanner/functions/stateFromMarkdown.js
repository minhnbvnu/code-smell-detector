function stateFromMarkdown(markdown) {
  var element = _MarkdownParser2.default.parse(markdown, { getAST: true });
  return (0, _index.stateFromElement)(element);
}