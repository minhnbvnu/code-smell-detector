function embed_tokens(parser) {
                return function _embed_tokens_wrapper(...args) {
                    const start = S.token;
                    const expr = parser(...args);
                    expr.start = start;
                    expr.end = prev();
                    return expr;
                };
            }