function completionRecordForSwitch(cases, paths) {
  let isLastCaseWithConsequent = true;

  for (let i = cases.length - 1; i >= 0; i--) {
    const switchCase = cases[i];
    const consequent = switchCase.get("consequent");
    let breakStatement = findBreak(consequent);

    if (breakStatement) {
      while (breakStatement.key === 0 && breakStatement.parentPath.isBlockStatement()) {
        breakStatement = breakStatement.parentPath;
      }

      const prevSibling = breakStatement.getPrevSibling();

      if (breakStatement.key > 0 && (prevSibling.isExpressionStatement() || prevSibling.isBlockStatement())) {
        paths = addCompletionRecords(prevSibling, paths);
        breakStatement.remove();
      } else {
        breakStatement.replaceWith(breakStatement.scope.buildUndefinedNode());
        paths = addCompletionRecords(breakStatement, paths);
      }
    } else if (isLastCaseWithConsequent) {
      const statementFinder = statement => !statement.isBlockStatement() || statement.get("body").some(statementFinder);

      const hasConsequent = consequent.some(statementFinder);

      if (hasConsequent) {
        paths = addCompletionRecords(consequent[consequent.length - 1], paths);
        isLastCaseWithConsequent = false;
      }
    }
  }

  return paths;
}