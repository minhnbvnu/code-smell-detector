function isTreeSitter(grammar) {
  return grammar.constructor.name === 'TreeSitterGrammar';
}