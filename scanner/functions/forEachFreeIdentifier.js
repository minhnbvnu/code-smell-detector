function forEachFreeIdentifier(node, cb) {
            if (isIdentifier(node) && isFreeIdentifier(node))
                cb(node);
            node.forEachChild((child) => forEachFreeIdentifier(child, cb));
        }