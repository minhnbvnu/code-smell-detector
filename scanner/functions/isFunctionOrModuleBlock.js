function isFunctionOrModuleBlock(node) {
            return isSourceFile(node) || isModuleBlock(node) || isBlock(node) && isFunctionLike(node.parent);
        }