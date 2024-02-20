function coverVariableDeclarator(path) {
    this.insertStatementCounter(path.get('init'));
}