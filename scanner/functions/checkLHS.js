function checkLHS(node, scope) {
    if (node.type == "Identifier" && !(node.name in ignoredGlobals) &&
        !inScope(node.name, scope)) {
      ignoredGlobals[node.name] = true;
      fail("Assignment to global variable", node.loc);
    }
  }