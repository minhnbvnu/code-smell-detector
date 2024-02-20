function postInfer(ast, scope) {
    jsdocParseTypedefs(ast.sourceFile.text, scope);

    walk.simple(ast, {
      VariableDeclaration: function(node, scope) {
        var decl = node.declarations[0].id;
        if (node.commentsBefore && decl.type == "Identifier")
          interpretComments(node, node.commentsBefore, scope,
                            scope.getProp(node.declarations[0].id.name));
      },
      FunctionDeclaration: function(node, scope) {
        if (node.commentsBefore)
          interpretComments(node, node.commentsBefore, scope,
                            scope.getProp(node.id.name),
                            node.scope.fnType);
      },
      ClassDeclaration: function(node, scope) {
        if (node.commentsBefore)
          interpretComments(node, node.commentsBefore, scope,
                            scope.getProp(node.id.name),
                            node.objType);
      },
      AssignmentExpression: function(node, scope) {
        if (node.commentsBefore)
          interpretComments(node, node.commentsBefore, scope,
                            infer.expressionType({node: node.left, state: scope}));
      },
      ObjectExpression: function(node, scope) {
        for (var i = 0; i < node.properties.length; ++i) {
          var prop = node.properties[i];
          if (prop.type == 'SpreadElement') { continue; }
          var name = infer.propName(prop);
          if (name != "<i>" && prop.commentsBefore)
            interpretComments(prop, prop.commentsBefore, scope, node.objType.getProp(name));
        }
      },
      Class: function(node, scope) {
        if (!node.objType) return;
        var proto = node.objType.getProp("prototype").getObjType();
        if (!proto) return;
        for (var i = 0; i < node.body.body.length; i++) {
          var method = node.body.body[i], name;
          if (!method.commentsBefore) continue;
          if (method.kind == "constructor")
            interpretComments(method, method.commentsBefore, scope, node.objType);
          else if ((name = infer.propName(method)) != "<i>")
            interpretComments(method, method.commentsBefore, scope, proto.getProp(name));
        }
      },
      CallExpression: function(node, scope) {
        if (node.commentsBefore && isDefinePropertyCall(node)) {
          var type = infer.expressionType({node: node.arguments[0], state: scope}).getObjType();
          if (type && type instanceof infer.Obj) {
            var prop = type.props[node.arguments[1].value];
            if (prop) interpretComments(node, node.commentsBefore, scope, prop);
          }
        }
      },
      ExportNamedDeclaration: function(node, scope) {
        if (node.commentsBefore && node.declaration && node.declaration.type === 'FunctionDeclaration') {
          interpretComments(node.declaration, node.commentsBefore, scope,
                            scope.getProp(node.declaration.id.name),
                            node.declaration.scope.fnType);
        }
      },
      ExportDefaultDeclaration: function(node, scope) {
        if (node.commentsBefore && node.declaration && node.declaration.type === 'FunctionDeclaration') {
          interpretComments(node.declaration, node.commentsBefore, scope,
                            scope.getProp(node.declaration.id.name),
                            node.declaration.scope.fnType);
        }
      }
    }, infer.searchVisitor, scope);
  }