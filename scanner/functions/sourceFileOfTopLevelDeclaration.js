function sourceFileOfTopLevelDeclaration(node) {
            return isVariableDeclaration(node) ? node.parent.parent.parent : node.parent;
        }