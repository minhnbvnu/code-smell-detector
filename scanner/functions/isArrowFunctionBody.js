function isArrowFunctionBody(node) {
            return node.parent && isArrowFunction(node.parent) && node.parent.body === node;
        }