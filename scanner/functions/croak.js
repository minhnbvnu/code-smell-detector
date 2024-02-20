function croak(msg, line, col, pos) {
                var ctx = S.input.context();
                js_error(msg, ctx.filename, line != null ? line : ctx.tokline, col != null ? col : ctx.tokcol, pos != null ? pos : ctx.tokpos);
            }