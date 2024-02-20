function stateToHTML(content) {
  return new MarkupGenerator(content).generate();
}