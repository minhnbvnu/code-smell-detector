function maybe_unary(no_in) {
        var start = S.token;
        if (S.in_async && is("name", "await")) {
            if (S.in_funarg === S.in_function) croak("Invalid use of await in function argument");
            S.input.context().regex_allowed = true;
            next();
            return new AST_Await({
                start: start,
                expression: maybe_unary(no_in),
                end: prev(),
            });
        }
        if (S.in_generator && is("name", "yield")) {
            if (S.in_funarg === S.in_function) croak("Invalid use of yield in function argument");
            S.input.context().regex_allowed = true;
            next();
            var exp = null;
            var nested = false;
            if (is("operator", "*")) {
                next();
                exp = maybe_assign(no_in);
                nested = true;
            } else if (is("punc") ? !PUNC_AFTER_EXPRESSION[S.token.value] : !can_insert_semicolon()) {
                exp = maybe_assign(no_in);
            }
            return new AST_Yield({
                start: start,
                expression: exp,
                nested: nested,
                end: prev(),
            });
        }
        if (is("operator") && UNARY_PREFIX[start.value]) {
            next();
            handle_regexp();
            var ex = make_unary(AST_UnaryPrefix, start, maybe_unary(no_in));
            ex.start = start;
            ex.end = prev();
            return ex;
        }
        var val = expr_atom(true);
        while (is("operator") && UNARY_POSTFIX[S.token.value] && !has_newline_before(S.token)) {
            val = make_unary(AST_UnaryPostfix, S.token, val);
            val.start = start;
            val.end = S.token;
            next();
        }
        return val;
    }