function findBreak(statements) {
  let breakStatement;

  if (!Array.isArray(statements)) {
    statements = [statements];
  }

  for (const statement of statements) {
    if (statement.isDoExpression() || statement.isProgram() || statement.isBlockStatement() || statement.isCatchClause() || statement.isLabeledStatement()) {
      breakStatement = findBreak(statement.get("body"));
    } else if (statement.isIfStatement()) {
      var _findBreak;

      breakStatement = (_findBreak = findBreak(statement.get("consequent"))) != null ? _findBreak : findBreak(statement.get("alternate"));
    } else if (statement.isTryStatement()) {
      var _findBreak2;

      breakStatement = (_findBreak2 = findBreak(statement.get("block"))) != null ? _findBreak2 : findBreak(statement.get("handler"));
    } else if (statement.isBreakStatement()) {
      breakStatement = statement;
    }

    if (breakStatement) {
      return breakStatement;
    }
  }

  return null;
}