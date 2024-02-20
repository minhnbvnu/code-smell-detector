function fn_name_unused(fn, compressor) {
        if (!fn.name || !compressor.option("ie")) return true;
        var def = fn.name.definition();
        if (compressor.exposed(def)) return false;
        return all(def.references, function(sym) {
            return !(sym instanceof AST_SymbolRef);
        });
    }