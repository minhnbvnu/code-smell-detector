function markEntityNameOrEntityExpressionAsReference(typeName, forDecoratorMetadata) {
                if (!typeName)
                    return;
                const rootName = getFirstIdentifier(typeName);
                const meaning = (typeName.kind === 79 /* Identifier */ ? 788968 /* Type */ : 1920 /* Namespace */) | 2097152 /* Alias */;
                const rootSymbol = resolveName(rootName, rootName.escapedText, meaning, 
                /*nameNotFoundMessage*/
                void 0, 
                /*nameArg*/
                void 0, 
                /*isReference*/
                true);
                if (rootSymbol && rootSymbol.flags & 2097152 /* Alias */) {
                    if (!compilerOptions.verbatimModuleSyntax && symbolIsValue(rootSymbol) && !isConstEnumOrConstEnumOnlyModule(resolveAlias(rootSymbol)) && !getTypeOnlyAliasDeclaration(rootSymbol)) {
                        markAliasSymbolAsReferenced(rootSymbol);
                    }
                    else if (forDecoratorMetadata && getIsolatedModules(compilerOptions) && getEmitModuleKind(compilerOptions) >= 5 /* ES2015 */ && !symbolIsValue(rootSymbol) && !some(rootSymbol.declarations, isTypeOnlyImportOrExportDeclaration)) {
                        const diag2 = error(typeName, Diagnostics.A_type_referenced_in_a_decorated_signature_must_be_imported_with_import_type_or_a_namespace_import_when_isolatedModules_and_emitDecoratorMetadata_are_enabled);
                        const aliasDeclaration = find(rootSymbol.declarations || emptyArray, isAliasSymbolDeclaration2);
                        if (aliasDeclaration) {
                            addRelatedInfo(diag2, createDiagnosticForNode(aliasDeclaration, Diagnostics._0_was_imported_here, idText(rootName)));
                        }
                    }
                }
            }