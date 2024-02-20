function is_safe_lexical(def) {
        return def.name != "arguments" && def.orig.length < (def.orig[0] instanceof AST_SymbolLambda ? 3 : 2);
    }