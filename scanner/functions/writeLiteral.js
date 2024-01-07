function writeLiteral(version, node, value) {
  writeExpression(getFilterNS(version), 'Literal', node, value);
}