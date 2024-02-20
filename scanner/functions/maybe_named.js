function maybe_named(def, expr) {
        if (expr.name) {
            expr = new def(expr);
            expr.name = new (def === AST_DefClass ? AST_SymbolDefClass : AST_SymbolDefun)(expr.name);
        }
        return expr;
    }