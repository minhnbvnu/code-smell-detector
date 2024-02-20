function getLastStatement(statement) {
  if (!t.isStatement(statement.body)) return statement;
  return getLastStatement(statement.body);
}