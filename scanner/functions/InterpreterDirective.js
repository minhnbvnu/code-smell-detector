function InterpreterDirective(node) {
  this.token(`#!${node.value}\n`);
}