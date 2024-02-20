function transformGlobalMethod(method) {
      var m = methodsRegex.exec(method);
      var result = methodsRegex.lastIndex = 0;
      return new AstMethod(m[3], transformParams(atoms[getAtomIndex(m[4])]), transformStatementsBlock(atoms[getAtomIndex(m[6])]))
    }