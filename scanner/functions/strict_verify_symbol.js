function strict_verify_symbol(sym) {
        if (sym.name == "arguments" || sym.name == "eval" || sym.name == "let")
            token_error(sym.start, "Unexpected " + sym.name + " in strict mode");
    }