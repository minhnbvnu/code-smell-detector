function maybe_destructured(type) {
        var start = S.token;
        if (is("punc", "[")) {
            next();
            var elements = expr_list("]", !options.strict, true, function() {
                return maybe_default(type);
            });
            return new AST_DestructuredArray({
                start: start,
                elements: elements,
                rest: elements.rest || null,
                end: prev(),
            });
        }
        if (is("punc", "{")) {
            next();
            var first = true, a = [], rest = null;
            while (!is("punc", "}")) {
                if (first) first = false; else expect(",");
                // allow trailing comma
                if (!options.strict && is("punc", "}")) break;
                var key_start = S.token;
                if (is("punc", "[") || is_token(peek(), "punc", ":")) {
                    var key = as_property_key();
                    expect(":");
                    a.push(new AST_DestructuredKeyVal({
                        start: key_start,
                        key: key,
                        value: maybe_default(type),
                        end: prev(),
                    }));
                    continue;
                }
                if (is("operator", "...")) {
                    next();
                    rest = maybe_destructured(type);
                    break;
                }
                var name = as_symbol(type);
                if (is("operator", "=")) {
                    next();
                    name = new AST_DefaultValue({
                        start: name.start,
                        name: name,
                        value: maybe_assign(),
                        end: prev(),
                    });
                }
                a.push(new AST_DestructuredKeyVal({
                    start: key_start,
                    key: key_start.value,
                    value: name,
                    end: prev(),
                }));
            }
            expect("}");
            return new AST_DestructuredObject({
                start: start,
                properties: a,
                rest: rest,
                end: prev(),
            });
        }
        return as_symbol(type);
    }