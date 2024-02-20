function value_in_use(node, parent) {
            if (parent instanceof AST_Array) return true;
            if (parent instanceof AST_Binary) return lazy_op[parent.operator];
            if (parent instanceof AST_Conditional) return parent.condition !== node;
            if (parent instanceof AST_Sequence) return parent.tail_node() === node;
            if (parent instanceof AST_Spread) return true;
        }