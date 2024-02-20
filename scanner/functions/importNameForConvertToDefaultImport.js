function importNameForConvertToDefaultImport(node) {
            switch (node.kind) {
                case 269 /* ImportDeclaration */:
                    const { importClause, moduleSpecifier } = node;
                    return importClause && !importClause.name && importClause.namedBindings && importClause.namedBindings.kind === 271 /* NamespaceImport */ && isStringLiteral(moduleSpecifier) ? importClause.namedBindings.name : void 0;
                case 268 /* ImportEqualsDeclaration */:
                    return node.name;
                default:
                    return void 0;
            }
        }