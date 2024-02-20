function transformImportEqualsDeclaration(decl) {
                if (!resolver.isDeclarationVisible(decl))
                    return;
                if (decl.moduleReference.kind === 280 /* ExternalModuleReference */) {
                    const specifier = getExternalModuleImportEqualsDeclarationExpression(decl);
                    return factory2.updateImportEqualsDeclaration(decl, decl.modifiers, decl.isTypeOnly, decl.name, factory2.updateExternalModuleReference(decl.moduleReference, rewriteModuleSpecifier(decl, specifier)));
                }
                else {
                    const oldDiag = getSymbolAccessibilityDiagnostic;
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(decl);
                    checkEntityNameVisibility(decl.moduleReference, enclosingDeclaration);
                    getSymbolAccessibilityDiagnostic = oldDiag;
                    return decl;
                }
            }