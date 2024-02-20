function needs_unbinding(compressor, val) {
        return val instanceof AST_PropAccess
            || is_undeclared_ref(val) && val.name == "eval";
    }