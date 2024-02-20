function left_is_object(node) {
            if (node instanceof AST_Object)
                return true;
            if (node instanceof AST_Sequence)
                return left_is_object(node.expressions[0]);
            if (node.TYPE === "Call")
                return left_is_object(node.expression);
            if (node instanceof AST_PrefixedTemplateString)
                return left_is_object(node.prefix);
            if (node instanceof AST_Dot || node instanceof AST_Sub)
                return left_is_object(node.expression);
            if (node instanceof AST_Chain)
                return left_is_object(node.expression);
            if (node instanceof AST_Conditional)
                return left_is_object(node.condition);
            if (node instanceof AST_Binary)
                return left_is_object(node.left);
            if (node instanceof AST_UnaryPostfix)
                return left_is_object(node.expression);
            return false;
        }