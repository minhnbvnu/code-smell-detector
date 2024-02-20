function checkReusedIndex(node) {
    if (!node.init || node.init.type != "VariableDeclaration") return;
    var name = node.init.declarations[0].id.name;
    walk.recursive(node.body, null, {
      Function: function() {},
      VariableDeclaration: function(node, st, c) {
        for (var i = 0; i < node.declarations.length; i++)
          if (node.declarations[i].id.name == name)
            fail("redefined loop variable", node.declarations[i].id.loc);
        walk.base.VariableDeclaration(node, st, c);
      }
    });
  }