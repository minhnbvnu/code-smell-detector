function fixSingleExportDeclaration(changes, exportSpecifier, context) {
            if (!exportSpecifier) {
                return;
            }
            const exportClause = exportSpecifier.parent;
            const exportDeclaration = exportClause.parent;
            const typeExportSpecifiers = getTypeExportSpecifiers(exportSpecifier, context);
            if (typeExportSpecifiers.length === exportClause.elements.length) {
                changes.insertModifierBefore(context.sourceFile, 154 /* TypeKeyword */, exportClause);
            }
            else {
                const valueExportDeclaration = factory.updateExportDeclaration(exportDeclaration, exportDeclaration.modifiers, 
                /*isTypeOnly*/
                false, factory.updateNamedExports(exportClause, filter(exportClause.elements, (e) => !contains(typeExportSpecifiers, e))), exportDeclaration.moduleSpecifier, 
                /*assertClause*/
                void 0);
                const typeExportDeclaration = factory.createExportDeclaration(
                /*modifiers*/
                void 0, 
                /*isTypeOnly*/
                true, factory.createNamedExports(typeExportSpecifiers), exportDeclaration.moduleSpecifier, 
                /*assertClause*/
                void 0);
                changes.replaceNode(context.sourceFile, exportDeclaration, valueExportDeclaration, {
                    leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.IncludeAll,
                    trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.Exclude
                });
                changes.insertNodeAfter(context.sourceFile, exportDeclaration, typeExportDeclaration);
            }
        }