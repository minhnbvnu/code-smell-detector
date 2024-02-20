function is_undefined(node, compressor) {
            return (has_flag(node, UNDEFINED)
                || node instanceof AST_Undefined
                || node instanceof AST_UnaryPrefix
                    && node.operator == "void"
                    && !node.expression.has_side_effects(compressor));
        }