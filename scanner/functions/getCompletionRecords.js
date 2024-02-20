function getCompletionRecords() {
  let paths = [];

  if (this.isIfStatement()) {
    paths = addCompletionRecords(this.get("consequent"), paths);
    paths = addCompletionRecords(this.get("alternate"), paths);
  } else if (this.isDoExpression() || this.isFor() || this.isWhile()) {
    paths = addCompletionRecords(this.get("body"), paths);
  } else if (this.isProgram() || this.isBlockStatement()) {
    paths = addCompletionRecords(this.get("body").pop(), paths);
  } else if (this.isFunction()) {
    return this.get("body").getCompletionRecords();
  } else if (this.isTryStatement()) {
    paths = addCompletionRecords(this.get("block"), paths);
    paths = addCompletionRecords(this.get("handler"), paths);
  } else if (this.isCatchClause()) {
    paths = addCompletionRecords(this.get("body"), paths);
  } else if (this.isSwitchStatement()) {
    paths = completionRecordForSwitch(this.get("cases"), paths);
  } else {
    paths.push(this);
  }

  return paths;
}