function merge_assignments() {
            for (var i = 1; i < end; i++) {
                var prev = expressions[i - 1];
                var def = is_simple_assign(prev);
                if (!def) continue;
                var expr = expressions[i];
                if (compressor.option("conditionals")) {
                    var cond = to_conditional_assignment(compressor, def, prev.right, expr);
                    if (cond) {
                        prev.right = cond;
                        expressions.splice(i--, 1);
                        end--;
                        continue;
                    }
                }
                if (compressor.option("dead_code")
                    && is_simple_assign(expr) === def
                    && expr.right.is_constant_expression(def.scope.resolve())) {
                    expressions[--i] = prev.right;
                }
            }
        }