function getDeclaration2(sourceFile, pos) {
            const { parent: parent2 } = getTokenAtPosition(sourceFile, pos);
            return isImportSpecifier(parent2) || isImportDeclaration(parent2) && parent2.importClause ? parent2 : void 0;
        }