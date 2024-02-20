function isAlwaysType(node) {
            if (node.kind === 261 /* InterfaceDeclaration */) {
                return true;
            }
            return false;
        }