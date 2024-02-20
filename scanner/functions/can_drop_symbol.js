function can_drop_symbol(ref, compressor, keep_lambda) {
        var def = ref.redef || ref.definition();
        if (ref.in_arg && is_funarg(def)) return false;
        return all(def.orig, function(sym) {
            if (sym instanceof AST_SymbolConst || sym instanceof AST_SymbolLet) {
                return compressor && can_varify(compressor, sym);
            }
            return !(keep_lambda && sym instanceof AST_SymbolLambda);
        });
    }