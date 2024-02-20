function is_primitive(compressor, node) {
        if (node.is_constant()) return true;
        if (node instanceof AST_Assign) return node.operator != "=" || is_primitive(compressor, node.right);
        if (node instanceof AST_Binary) {
            return !lazy_op[node.operator]
                || is_primitive(compressor, node.left) && is_primitive(compressor, node.right);
        }
        if (node instanceof AST_Conditional) {
            return is_primitive(compressor, node.consequent) && is_primitive(compressor, node.alternative);
        }
        if (node instanceof AST_Sequence) return is_primitive(compressor, node.tail_node());
        if (node instanceof AST_SymbolRef) {
            var fixed = node.fixed_value();
            return fixed && is_primitive(compressor, fixed);
        }
        if (node instanceof AST_Template) return !node.tag || is_raw_tag(compressor, node.tag);
        if (node instanceof AST_Unary) return true;
    }