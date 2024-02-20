function is_true(node) {
                return node instanceof AST_True
                    || in_bool
                        && node instanceof AST_Constant
                        && node.getValue()
                    || (node instanceof AST_UnaryPrefix
                        && node.operator == "!"
                        && node.expression instanceof AST_Constant
                        && !node.expression.getValue());
            }