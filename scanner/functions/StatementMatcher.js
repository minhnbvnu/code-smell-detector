function StatementMatcher(operation, operationPattern) {
  this.operation = operation
  this.matcher = new RegExp('^\\s*' + operation, 'ig')
  this.operationPattern = operationPattern
}