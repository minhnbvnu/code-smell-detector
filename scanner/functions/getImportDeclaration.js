function getImportDeclaration(sourceFile, program, start) {
            const identifier = tryCast(getTokenAtPosition(sourceFile, start), isIdentifier);
            if (!identifier || identifier.parent.kind !== 180 /* TypeReference */)
                return;
            const checker = program.getTypeChecker();
            const symbol = checker.getSymbolAtLocation(identifier);
            return find((symbol == null ? void 0 : symbol.declarations) || emptyArray, or(isImportClause, isImportSpecifier, isImportEqualsDeclaration));
        }