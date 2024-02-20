function loopPattern(init) {
    return init.type == "VariableDeclaration" ? init.declarations[0].id : init;
  }