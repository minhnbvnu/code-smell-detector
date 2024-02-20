function get_symbol_name(sym) {
        var def = sym.definition();
        return def && def.mangled_name || sym.name;
    }