function if_() {
                var cond = parenthesised(), body = statement(false, false, true), belse = null;
                if (is("keyword", "else")) {
                    next();
                    belse = statement(false, false, true);
                }
                return new AST_If({
                    condition: cond,
                    body: body,
                    alternative: belse
                });
            }