function need_chain_parens(node, parent) {
        if (!node.terminal) return false;
        if (!(parent instanceof AST_Call || parent instanceof AST_PropAccess)) return false;
        return parent.expression === node;
    }