function getImportKindOrder(s1) {
            var _a2;
            switch (s1.kind) {
                case 269 /* ImportDeclaration */:
                    if (!s1.importClause)
                        return 0;
                    if (s1.importClause.isTypeOnly)
                        return 1;
                    if (((_a2 = s1.importClause.namedBindings) == null ? void 0 : _a2.kind) === 271 /* NamespaceImport */)
                        return 2;
                    if (s1.importClause.name)
                        return 3;
                    return 4;
                case 268 /* ImportEqualsDeclaration */:
                    return 5;
                case 240 /* VariableStatement */:
                    return 6;
            }
        }