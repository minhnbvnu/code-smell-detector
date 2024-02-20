function getSymbolOfCallHierarchyDeclaration(typeChecker, node) {
            const location = getCallHierarchyDeclarationReferenceNode(node);
            return location && typeChecker.getSymbolAtLocation(location);
        }