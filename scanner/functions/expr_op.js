function expr_op(left, min_prec, no_in) {
                var op = is("operator") ? S.token.value : null;
                if (op && op == "in" && no_in) op = null;
                var prec = op != null ? PRECEDENCE[op] : null;
                if (prec != null && prec > min_prec) {
                        next();
                        var right = expr_op(expr_atom(true), prec, no_in);
                        return expr_op(as("binary", op, left, right), min_prec, no_in);
                }
                return left;
        }