function should_merge_comments(node, parent) {
        if (parent instanceof AST_Binary) return parent.left === node;
        if (parent.TYPE == "Call") return parent.expression === node;
        if (parent instanceof AST_Conditional) return parent.condition === node;
        if (parent instanceof AST_Dot) return parent.expression === node;
        if (parent instanceof AST_Exit) return true;
        if (parent instanceof AST_Sequence) return parent.expressions[0] === node;
        if (parent instanceof AST_Sub) return parent.expression === node;
        if (parent instanceof AST_UnaryPostfix) return true;
        if (parent instanceof AST_Yield) return true;
    }