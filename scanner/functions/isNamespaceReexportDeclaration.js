function isNamespaceReexportDeclaration(node) {
            return isNamespaceExport(node) && !!node.parent.moduleSpecifier;
        }