function transformImportDeclaration(decl) {
                if (!decl.importClause) {
                    return factory2.updateImportDeclaration(decl, decl.modifiers, decl.importClause, rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause));
                }
                const visibleDefaultBinding = decl.importClause && decl.importClause.name && resolver.isDeclarationVisible(decl.importClause) ? decl.importClause.name : void 0;
                if (!decl.importClause.namedBindings) {
                    return visibleDefaultBinding && factory2.updateImportDeclaration(decl, decl.modifiers, factory2.updateImportClause(decl.importClause, decl.importClause.isTypeOnly, visibleDefaultBinding, 
                    /*namedBindings*/
                    void 0), rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause));
                }
                if (decl.importClause.namedBindings.kind === 271 /* NamespaceImport */) {
                    const namedBindings = resolver.isDeclarationVisible(decl.importClause.namedBindings) ? decl.importClause.namedBindings : (
                    /*namedBindings*/
                    void 0);
                    return visibleDefaultBinding || namedBindings ? factory2.updateImportDeclaration(decl, decl.modifiers, factory2.updateImportClause(decl.importClause, decl.importClause.isTypeOnly, visibleDefaultBinding, namedBindings), rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause)) : void 0;
                }
                const bindingList = mapDefined(decl.importClause.namedBindings.elements, (b) => resolver.isDeclarationVisible(b) ? b : void 0);
                if (bindingList && bindingList.length || visibleDefaultBinding) {
                    return factory2.updateImportDeclaration(decl, decl.modifiers, factory2.updateImportClause(decl.importClause, decl.importClause.isTypeOnly, visibleDefaultBinding, bindingList && bindingList.length ? factory2.updateNamedImports(decl.importClause.namedBindings, bindingList) : void 0), rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause));
                }
                if (resolver.isImportRequiredByAugmentation(decl)) {
                    return factory2.updateImportDeclaration(decl, decl.modifiers, 
                    /*importClause*/
                    void 0, rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause));
                }
            }