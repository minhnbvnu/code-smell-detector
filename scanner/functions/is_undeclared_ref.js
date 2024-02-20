function is_undeclared_ref(node) {
        return node instanceof AST_SymbolRef && node.definition().undeclared;
    }