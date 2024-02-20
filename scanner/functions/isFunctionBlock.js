function isFunctionBlock(node) {
            return node && node.kind === 238 /* Block */ && isFunctionLike(node.parent);
        }