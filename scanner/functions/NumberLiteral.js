function NumberLiteral(...args) {
  console.trace("The node type NumberLiteral has been renamed to NumericLiteral");
  return (0, _builder.default)("NumberLiteral", ...args);
}