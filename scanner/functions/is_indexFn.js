function is_indexFn(node) {
            return node.TYPE == "Call"
                && node.expression instanceof AST_Dot
                && indexFns[node.expression.property];
        }