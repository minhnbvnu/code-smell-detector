function is_tail(node, parent) {
            if (parent instanceof AST_Binary) {
                return parent.right === node || parent.right.is_constant_expression(scope);
            }
            if (parent instanceof AST_Conditional) {
                return parent.condition !== node
                    || parent.consequent.is_constant_expression(scope)
                        && parent.alternative.is_constant_expression(scope);
            }
            if (parent instanceof AST_Sequence) {
                var exprs = parent.expressions;
                var stop = exprs.indexOf(node);
                if (stop < 0) return false;
                for (var i = exprs.length; --i > stop;) {
                    if (!exprs[i].is_constant_expression(scope)) return false;
                }
                return true;
            }
            if (parent instanceof AST_UnaryPrefix) return true;
        }