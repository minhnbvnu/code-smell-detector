function getObjectInferred(expr) {
      const ast = parse(`
        static function hello(): void {
          var a = ${expr};
        }`, '__filename');
      const [f1] = ast.moduleBody.nodes;
      const [s1] = f1.functionBody.stmts.stmts;
      return s1.expr.inferred;
    }