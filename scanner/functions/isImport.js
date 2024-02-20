function isImport(token) {
            return token.kind === 100 /* ImportKeyword */ || token.kind === 79 /* Identifier */ && (token.parent.kind === 273 /* ImportSpecifier */ || token.parent.kind === 270 /* ImportClause */);
        }