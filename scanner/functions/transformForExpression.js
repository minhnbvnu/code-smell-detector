function transformForExpression(expr) {
      var content;
      if (/\bin\b/.test(expr)) {
        content = expr.substring(1, expr.length - 1).split(/\bin\b/g);
        return new AstForInExpression(transformStatement(trim(content[0])), transformExpression(content[1]))
      }
      if (expr.indexOf(":") >= 0 && expr.indexOf(";") < 0) {
        content = expr.substring(1, expr.length - 1).split(":");
        return new AstForEachExpression(transformStatement(trim(content[0])), transformExpression(content[1]))
      }
      content = expr.substring(1, expr.length - 1).split(";");
      return new AstForExpression(transformStatement(trim(content[0])), transformExpression(content[1]), transformExpression(content[2]))
    }