function is_modify_array(node) {
            var found = false;
            node.walk(new TreeWalker(function(node) {
                if (found) return true;
                if (node instanceof AST_Assign) {
                    if (node.left instanceof AST_PropAccess) return found = true;
                } else if (node instanceof AST_Unary) {
                    if (unary_side_effects[node.operator] && node.expression instanceof AST_PropAccess) {
                        return found = true;
                    }
                }
            }));
            return found;
        }