function _await_expression() {
                // Previous token must be "await" and not be interpreted as an identifier
                if (!can_await()) {
                    croak("Unexpected await expression outside async function", S.prev.line, S.prev.col, S.prev.pos);
                }
                // the await expression is parsed as a unary expression in Babel
                return new AST_Await({
                    start: prev(),
                    end: S.token,
                    expression: maybe_unary(true),
                });
            }