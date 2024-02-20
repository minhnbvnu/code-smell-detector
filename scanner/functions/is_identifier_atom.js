function is_identifier_atom(node) {
            return node instanceof AST_Infinity
                || node instanceof AST_NaN
                || node instanceof AST_Undefined;
        }