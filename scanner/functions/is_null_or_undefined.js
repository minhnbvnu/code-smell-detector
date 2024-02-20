function is_null_or_undefined(node, compressor) {
            let fixed;
            return (node instanceof AST_Null
                || is_undefined(node, compressor)
                || (node instanceof AST_SymbolRef
                    && (fixed = node.definition().fixed) instanceof AST_Node
                    && is_nullish(fixed, compressor)));
        }