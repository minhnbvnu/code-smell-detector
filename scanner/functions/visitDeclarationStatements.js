function visitDeclarationStatements(input) {
                if (!isPreservedDeclarationStatement(input)) {
                    return;
                }
                if (shouldStripInternal(input))
                    return;
                switch (input.kind) {
                    case 275 /* ExportDeclaration */: {
                        if (isSourceFile(input.parent)) {
                            resultHasExternalModuleIndicator = true;
                        }
                        resultHasScopeMarker = true;
                        return factory2.updateExportDeclaration(input, input.modifiers, input.isTypeOnly, input.exportClause, rewriteModuleSpecifier(input, input.moduleSpecifier), getResolutionModeOverrideForClause(input.assertClause) ? input.assertClause : void 0);
                    }
                    case 274 /* ExportAssignment */: {
                        if (isSourceFile(input.parent)) {
                            resultHasExternalModuleIndicator = true;
                        }
                        resultHasScopeMarker = true;
                        if (input.expression.kind === 79 /* Identifier */) {
                            return input;
                        }
                        else {
                            const newId = factory2.createUniqueName("_default", 16 /* Optimistic */);
                            getSymbolAccessibilityDiagnostic = () => ({
                                diagnosticMessage: Diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
                                errorNode: input
                            });
                            errorFallbackNode = input;
                            const varDecl = factory2.createVariableDeclaration(newId, 
                            /*exclamationToken*/
                            void 0, resolver.createTypeOfExpression(input.expression, input, declarationEmitNodeBuilderFlags, symbolTracker), 
                            /*initializer*/
                            void 0);
                            errorFallbackNode = void 0;
                            const statement = factory2.createVariableStatement(needsDeclare ? [factory2.createModifier(136 /* DeclareKeyword */)] : [], factory2.createVariableDeclarationList([varDecl], 2 /* Const */));
                            preserveJsDoc(statement, input);
                            removeAllComments(input);
                            return [statement, factory2.updateExportAssignment(input, input.modifiers, newId)];
                        }
                    }
                }
                const result = transformTopLevelDeclaration(input);
                lateStatementReplacementMap.set(getOriginalNodeId(input), result);
                return input;
            }