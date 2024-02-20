function getImportDeclaration2(sourceFile, span) {
            return findAncestor(getTokenAtPosition(sourceFile, span.start), isImportDeclaration);
        }