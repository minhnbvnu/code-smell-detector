function filter_for_side_effects() {
                var first = first_in_statement(compressor);
                var last = self.expressions.length - 1;
                self.expressions.forEach(function (expr, index) {
                    if (index < last)
                        expr = expr.drop_side_effect_free(compressor, first);
                    if (expr) {
                        merge_sequence(expressions, expr);
                        first = false;
                    }
                });
            }