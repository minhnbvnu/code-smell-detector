function checkAccessibility(node) {
        switch (node.accessibility) {
            case 'protected':
            case 'private':
                return false;
            case 'public':
                if (node.parent &&
                    node.parent.type === utils_1.AST_NODE_TYPES.ClassBody &&
                    node.parent.parent &&
                    'superClass' in node.parent.parent &&
                    node.parent.parent.superClass) {
                    return false;
                }
                break;
        }
        return true;
    }