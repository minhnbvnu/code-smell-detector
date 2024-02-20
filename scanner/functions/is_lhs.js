function is_lhs(node, parent) {
            if (parent instanceof AST_Unary && unary_side_effects.has(parent.operator))
                return parent.expression;
            if (parent instanceof AST_Assign && parent.left === node)
                return node;
        }