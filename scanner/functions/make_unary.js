function make_unary(ctor, token, expr) {
                var op = token.value;
                switch (op) {
                    case "++":
                    case "--":
                        if (!is_assignable(expr))
                            croak("Invalid use of " + op + " operator", token.line, token.col, token.pos);
                        break;
                    case "delete":
                        if (expr instanceof AST_SymbolRef && S.input.has_directive("use strict"))
                            croak("Calling delete on expression not allowed in strict mode", expr.start.line, expr.start.col, expr.start.pos);
                        break;
                }
                return new ctor({ operator: op, expression: expr });
            }