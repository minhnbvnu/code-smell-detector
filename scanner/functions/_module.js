function _module(name) {
  const filePath = path.join(__dirname, '../builtin', `${name}.dara`);
  const source = fs.readFileSync(filePath, 'utf-8');
  const lexer = new Lexer(source, filePath);
  const parser = new Parser(lexer);
  const ast = parser.program();
  return ast;
}