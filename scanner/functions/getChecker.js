function getChecker(source, filePath) {
  const lexer = new Lexer(source, filePath);
  const parser = new Parser(lexer);
  const ast = parser.program();
  return new TypeChecker(source, filePath).check(ast);
}