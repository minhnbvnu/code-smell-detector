function isInitializedVariable(node) {
            return isVariableDeclaration(node) && node.initializer !== void 0;
        }