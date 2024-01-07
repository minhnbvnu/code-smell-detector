function writePropertyName(version, node, value) {
  if (version === '2.0.0') {
    writeExpression(FESNS[version], 'ValueReference', node, value);
  } else {
    writeExpression(OGCNS[version], 'PropertyName', node, value);
  }
}