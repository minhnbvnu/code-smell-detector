function isFunctionBody(node) {
        const parent = node.parent;
        return (node.type === "BlockStatement" &&
            astUtils.isFunction(parent) &&
            parent.body === node);
    }