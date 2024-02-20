function stateToMarkdown(content) {
  return new MarkupGenerator(content).generate();
}