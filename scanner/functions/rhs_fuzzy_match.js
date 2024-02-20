function rhs_fuzzy_match(value, fallback) {
                return function(node, tw) {
                    if (tw.in_boolean_context()) {
                        if (value && node.is_truthy() && !node.has_side_effects(compressor)) {
                            return true;
                        }
                        if (node.is_constant()) {
                            var ev = node.evaluate(compressor);
                            if (!(ev instanceof AST_Node)) return !ev == !value;
                        }
                    }
                    return fallback(node);
                };
            }