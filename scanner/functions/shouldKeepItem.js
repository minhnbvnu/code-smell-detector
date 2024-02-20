function shouldKeepItem(declaration, checker) {
            switch (declaration.kind) {
                case 270 /* ImportClause */:
                case 273 /* ImportSpecifier */:
                case 268 /* ImportEqualsDeclaration */:
                    const importer = checker.getSymbolAtLocation(declaration.name);
                    const imported = checker.getAliasedSymbol(importer);
                    return importer.escapedName !== imported.escapedName;
                default:
                    return true;
            }
        }