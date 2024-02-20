function doTypeOnlyImportChange(changes, sourceFile, importDeclaration, program) {
            if (importDeclaration.kind === 268 /* ImportEqualsDeclaration */) {
                changes.insertModifierBefore(sourceFile, 154 /* TypeKeyword */, importDeclaration.name);
                return;
            }
            const importClause = importDeclaration.kind === 270 /* ImportClause */ ? importDeclaration : importDeclaration.parent.parent;
            if (importClause.name && importClause.namedBindings) {
                return;
            }
            const checker = program.getTypeChecker();
            const importsValue = !!forEachImportClauseDeclaration(importClause, (decl) => {
                if (skipAlias(decl.symbol, checker).flags & 111551 /* Value */)
                    return true;
            });
            if (importsValue) {
                return;
            }
            changes.insertModifierBefore(sourceFile, 154 /* TypeKeyword */, importClause);
        }