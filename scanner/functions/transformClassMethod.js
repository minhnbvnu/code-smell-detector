function transformClassMethod(method) {
      var m = methodsRegex.exec(method);
      methodsRegex.lastIndex = 0;
      var isStatic = m[1].indexOf("static") >= 0;
      var body = m[6] !== ";" ? atoms[getAtomIndex(m[6])] : "{}";
      return new AstClassMethod(m[3], transformParams(atoms[getAtomIndex(m[4])]), transformStatementsBlock(body), isStatic)
    }