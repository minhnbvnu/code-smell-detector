function tryGetExportDeclaration(sourceFile, isTypeOnly) {
            const predicate = (node) => isExportDeclaration(node) && (isTypeOnly && node.isTypeOnly || !node.isTypeOnly);
            return findLast(sourceFile.statements, predicate);
        }