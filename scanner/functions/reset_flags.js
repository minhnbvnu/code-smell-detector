function reset_flags(node) {
        node._squeezed = false;
        node._optimized = false;
        delete node.fixed;
        if (node instanceof AST_Scope) delete node._var_names;
    }