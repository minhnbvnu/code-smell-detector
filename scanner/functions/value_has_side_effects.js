function value_has_side_effects(expr) {
                    if (expr instanceof AST_Unary)
                        return unary_side_effects.has(expr.operator);
                    return get_rvalue(expr).has_side_effects(compressor);
                }