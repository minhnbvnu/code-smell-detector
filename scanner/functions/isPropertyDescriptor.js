function isPropertyDescriptor(node, scope) {
        if (isArgumentOfGlobalMethodCall(node, scope, "Object", "defineProperty", 2) ||
            isArgumentOfGlobalMethodCall(node, scope, "Reflect", "defineProperty", 2)) {
            return true;
        }
        const parent = node.parent;
        if (parent.type === "Property" &&
            parent.value === node) {
            const grandparent = parent.parent;
            if (grandparent.type === "ObjectExpression" &&
                (isArgumentOfGlobalMethodCall(grandparent, scope, "Object", "create", 1) ||
                    isArgumentOfGlobalMethodCall(grandparent, scope, "Object", "defineProperties", 1))) {
                return true;
            }
        }
        return false;
    }