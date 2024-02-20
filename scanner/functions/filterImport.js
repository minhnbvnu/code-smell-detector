function filterImport(i, moduleSpecifier, keep) {
            switch (i.kind) {
                case 269 /* ImportDeclaration */: {
                    const clause = i.importClause;
                    if (!clause)
                        return void 0;
                    const defaultImport = clause.name && keep(clause.name) ? clause.name : void 0;
                    const namedBindings = clause.namedBindings && filterNamedBindings(clause.namedBindings, keep);
                    return defaultImport || namedBindings ? factory.createImportDeclaration(
                    /*modifiers*/
                    void 0, factory.createImportClause(clause.isTypeOnly, defaultImport, namedBindings), moduleSpecifier, 
                    /*assertClause*/
                    void 0) : void 0;
                }
                case 268 /* ImportEqualsDeclaration */:
                    return keep(i.name) ? i : void 0;
                case 257 /* VariableDeclaration */: {
                    const name = filterBindingName(i.name, keep);
                    return name ? makeVariableStatement(name, i.type, createRequireCall(moduleSpecifier), i.parent.flags) : void 0;
                }
                default:
                    return Debug.assertNever(i, `Unexpected import kind ${i.kind}`);
            }
        }