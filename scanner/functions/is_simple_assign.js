function is_simple_assign(node) {
            return node instanceof AST_Assign
                && node.operator == "="
                && node.left instanceof AST_SymbolRef
                && node.left.definition();
        }