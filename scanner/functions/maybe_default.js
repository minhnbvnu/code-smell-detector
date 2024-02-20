function maybe_default(type) {
        var start = S.token;
        var name = maybe_destructured(type);
        if (!is("operator", "=")) return name;
        next();
        return new AST_DefaultValue({
            start: start,
            name: name,
            value: maybe_assign(),
            end: prev(),
        });
    }