function getModifiers2(node) {
            if (node.parent && node.parent.kind === 257 /* VariableDeclaration */) {
                node = node.parent;
            }
            return getNodeModifiers(node);
        }