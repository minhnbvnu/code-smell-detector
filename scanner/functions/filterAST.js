function filterAST(ast) {
    var context = {};
    return compiler.filterNode(context, ast);
  }