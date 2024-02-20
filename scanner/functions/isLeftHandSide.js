function isLeftHandSide(node) {
        const parent = node.parent;
        // a++
        if (parent.type === utils_1.AST_NODE_TYPES.UpdateExpression) {
            return true;
        }
        // a + b
        if ((parent.type === utils_1.AST_NODE_TYPES.BinaryExpression ||
            parent.type === utils_1.AST_NODE_TYPES.LogicalExpression ||
            parent.type === utils_1.AST_NODE_TYPES.AssignmentExpression) &&
            node === parent.left) {
            return true;
        }
        // a ? b : c
        if (parent.type === utils_1.AST_NODE_TYPES.ConditionalExpression &&
            node === parent.test) {
            return true;
        }
        // a(b)
        if (parent.type === utils_1.AST_NODE_TYPES.CallExpression && node === parent.callee) {
            return true;
        }
        // a`b`
        if (parent.type === utils_1.AST_NODE_TYPES.TaggedTemplateExpression &&
            node === parent.tag) {
            return true;
        }
        return false;
    }