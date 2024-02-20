function isInInitializer(variable, reference) {
        var _a;
        if (variable.scope !== reference.from) {
            return false;
        }
        let node = variable.identifiers[0].parent;
        const location = reference.identifier.range[1];
        while (node) {
            if (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator) {
                if (isInRange(node.init, location)) {
                    return true;
                }
                if (((_a = node.parent) === null || _a === void 0 ? void 0 : _a.parent) &&
                    (node.parent.parent.type === utils_1.AST_NODE_TYPES.ForInStatement ||
                        node.parent.parent.type === utils_1.AST_NODE_TYPES.ForOfStatement) &&
                    isInRange(node.parent.parent.right, location)) {
                    return true;
                }
                break;
            }
            else if (node.type === utils_1.AST_NODE_TYPES.AssignmentPattern) {
                if (isInRange(node.right, location)) {
                    return true;
                }
            }
            else if (SENTINEL_TYPE.test(node.type)) {
                break;
            }
            node = node.parent;
        }
        return false;
    }