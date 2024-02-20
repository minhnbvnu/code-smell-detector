function is_nullish_shortcircuited(node, compressor) {
            if (node instanceof AST_PropAccess || node instanceof AST_Call) {
                return ((node.optional && is_null_or_undefined(node.expression, compressor))
                    || is_nullish_shortcircuited(node.expression, compressor));
            }
            if (node instanceof AST_Chain)
                return is_nullish_shortcircuited(node.expression, compressor);
            return false;
        }