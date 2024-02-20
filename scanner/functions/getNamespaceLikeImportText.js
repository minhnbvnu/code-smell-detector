function getNamespaceLikeImportText(declaration) {
            var _a2, _b, _c;
            switch (declaration.kind) {
                case 257 /* VariableDeclaration */:
                    return (_a2 = tryCast(declaration.name, isIdentifier)) == null ? void 0 : _a2.text;
                case 268 /* ImportEqualsDeclaration */:
                    return declaration.name.text;
                case 269 /* ImportDeclaration */:
                    return (_c = tryCast((_b = declaration.importClause) == null ? void 0 : _b.namedBindings, isNamespaceImport)) == null ? void 0 : _c.name.text;
                default:
                    return Debug.assertNever(declaration);
            }
        }