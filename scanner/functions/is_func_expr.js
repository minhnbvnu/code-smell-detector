function is_func_expr(node) {
            return node instanceof AST_Arrow || node instanceof AST_Function;
        }