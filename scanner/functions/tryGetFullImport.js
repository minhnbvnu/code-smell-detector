function tryGetFullImport(token) {
            return token.kind === 100 /* ImportKeyword */ ? tryCast(token.parent, isImportDeclaration) : void 0;
        }