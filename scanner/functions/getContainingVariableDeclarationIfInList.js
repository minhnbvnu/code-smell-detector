function getContainingVariableDeclarationIfInList(node, scope) {
            let prevNode;
            while (node !== void 0 && node !== scope) {
                if (isVariableDeclaration(node) && node.initializer === prevNode && isVariableDeclarationList(node.parent) && node.parent.declarations.length > 1) {
                    return node;
                }
                prevNode = node;
                node = node.parent;
            }
        }