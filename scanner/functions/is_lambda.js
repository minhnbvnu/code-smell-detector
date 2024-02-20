function is_lambda(node) {
        return node instanceof AST_Class || node instanceof AST_Lambda;
    }