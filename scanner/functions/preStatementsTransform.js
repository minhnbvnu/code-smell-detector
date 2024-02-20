function preStatementsTransform(statements) {
      var s = statements;
      s = s.replace(/\b(catch\s*"B\d+"\s*"A\d+")(\s*catch\s*"B\d+"\s*"A\d+")+/g, "$1");
      return s
    }