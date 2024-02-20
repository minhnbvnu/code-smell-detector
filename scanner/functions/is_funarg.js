function is_funarg(def) {
        return def.orig[0] instanceof AST_SymbolFunarg || def.orig[1] instanceof AST_SymbolFunarg;
    }