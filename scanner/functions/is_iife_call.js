function is_iife_call(node) {
            if (node.TYPE != "Call")
                return false;
            return node.expression instanceof AST_Function || is_iife_call(node.expression);
        }