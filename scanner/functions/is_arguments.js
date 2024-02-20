function is_arguments(sym) {
        return sym.orig[0] instanceof AST_SymbolFunarg
            && !(sym.orig[1] instanceof AST_SymbolFunarg || sym.orig[2] instanceof AST_SymbolFunarg)
            && !is_arrow(sym.scope);
    }