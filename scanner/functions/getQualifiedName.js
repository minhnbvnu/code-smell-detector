function getQualifiedName(sourceFile, pos) {
            const qualifiedName = findAncestor(getTokenAtPosition(sourceFile, pos), isQualifiedName);
            Debug.assert(!!qualifiedName, "Expected position to be owned by a qualified name.");
            return isIdentifier(qualifiedName.left) ? qualifiedName : void 0;
        }