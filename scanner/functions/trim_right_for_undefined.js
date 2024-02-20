function trim_right_for_undefined() {
                while (end > 0 && is_undefined(expressions[end], compressor))
                    end--;
                if (end < expressions.length - 1) {
                    expressions[end] = make_node(AST_UnaryPrefix, self, {
                        operator: "void",
                        expression: expressions[end]
                    });
                    expressions.length = end + 1;
                }
            }