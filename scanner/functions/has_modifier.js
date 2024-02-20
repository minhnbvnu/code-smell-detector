function has_modifier(name) {
        if (!is("name", name)) return;
        var token = peek();
        if (!token) return;
        if (is_token(token, "operator", "=")) return;
        if (token.type == "punc" && /^[(;}]$/.test(token.value)) return;
        if (has_newline_before(token)) return;
        return next();
    }