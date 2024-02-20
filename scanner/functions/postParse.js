function postParse(ast, text) {
    function attachComments(node) { comment.ensureCommentsBefore(text, node); }

    walk.simple(ast, {
      VariableDeclaration: attachComments,
      FunctionDeclaration: attachComments,
      MethodDefinition: attachComments,
      Property: attachComments,
      AssignmentExpression: function(node) {
        if (node.operator == "=") attachComments(node);
      },
      CallExpression: function(node) {
        if (isDefinePropertyCall(node)) attachComments(node);
      },
      ExportNamedDeclaration: attachComments,
      ExportDefaultDeclaration: attachComments,
      ClassDeclaration: attachComments
    });
  }