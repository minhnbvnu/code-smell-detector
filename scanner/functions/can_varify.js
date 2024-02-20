function can_varify(compressor, sym) {
        if (!sym.fixed_value()) return false;
        var def = sym.definition();
        return is_safe_lexical(def) && same_scope(def) && !may_overlap(compressor, def);
    }