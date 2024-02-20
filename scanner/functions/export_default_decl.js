function export_default_decl() {
        if (is("name", "async")) {
            if (!is_token(peek(), "keyword", "function")) return;
            next();
            next();
            if (!is("operator", "*")) return maybe_named(AST_AsyncDefun, function_(AST_AsyncFunction));
            next();
            return maybe_named(AST_AsyncGeneratorDefun, function_(AST_AsyncGeneratorFunction));
        } else if (is("keyword")) switch (S.token.value) {
          case "class":
            next();
            return maybe_named(AST_DefClass, class_(AST_ClassExpression));
          case "function":
            next();
            if (!is("operator", "*")) return maybe_named(AST_Defun, function_(AST_Function));
            next();
            return maybe_named(AST_GeneratorDefun, function_(AST_GeneratorFunction));
        }
    }