function serializeMaybeAliasAssignment(symbol) {
                        if (symbol.flags & 4194304 /* Prototype */) {
                            return false;
                        }
                        const name = unescapeLeadingUnderscores(symbol.escapedName);
                        const isExportEquals = name === "export=" /* ExportEquals */;
                        const isDefault = name === "default" /* Default */;
                        const isExportAssignmentCompatibleSymbolName = isExportEquals || isDefault;
                        const aliasDecl = symbol.declarations && getDeclarationOfAliasSymbol(symbol);
                        const target = aliasDecl && getTargetOfAliasDeclaration(aliasDecl, 
                        /*dontRecursivelyResolve*/
                        true);
                        if (target && length(target.declarations) && some(target.declarations, (d) => getSourceFileOfNode(d) === getSourceFileOfNode(enclosingDeclaration))) {
                            const expr = aliasDecl && (isExportAssignment(aliasDecl) || isBinaryExpression(aliasDecl) ? getExportAssignmentExpression(aliasDecl) : getPropertyAssignmentAliasLikeExpression(aliasDecl));
                            const first2 = expr && isEntityNameExpression(expr) ? getFirstNonModuleExportsIdentifier(expr) : void 0;
                            const referenced = first2 && resolveEntityName(first2, 67108863 /* All */, 
                            /*ignoreErrors*/
                            true, 
                            /*dontResolveAlias*/
                            true, enclosingDeclaration);
                            if (referenced || target) {
                                includePrivateSymbol(referenced || target);
                            }
                            const prevDisableTrackSymbol = context.tracker.disableTrackSymbol;
                            context.tracker.disableTrackSymbol = true;
                            if (isExportAssignmentCompatibleSymbolName) {
                                results.push(factory.createExportAssignment(
                                /*modifiers*/
                                void 0, isExportEquals, symbolToExpression(target, context, 67108863 /* All */)));
                            }
                            else {
                                if (first2 === expr && first2) {
                                    serializeExportSpecifier(name, idText(first2));
                                }
                                else if (expr && isClassExpression(expr)) {
                                    serializeExportSpecifier(name, getInternalSymbolName(target, symbolName(target)));
                                }
                                else {
                                    const varName = getUnusedName(name, symbol);
                                    addResult(factory.createImportEqualsDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, factory.createIdentifier(varName), symbolToName(target, context, 67108863 /* All */, 
                                    /*expectsIdentifier*/
                                    false)), 0 /* None */);
                                    serializeExportSpecifier(name, varName);
                                }
                            }
                            context.tracker.disableTrackSymbol = prevDisableTrackSymbol;
                            return true;
                        }
                        else {
                            const varName = getUnusedName(name, symbol);
                            const typeToSerialize = getWidenedType(getTypeOfSymbol(getMergedSymbol(symbol)));
                            if (isTypeRepresentableAsFunctionNamespaceMerge(typeToSerialize, symbol)) {
                                serializeAsFunctionNamespaceMerge(typeToSerialize, symbol, varName, isExportAssignmentCompatibleSymbolName ? 0 /* None */ : 1 /* Export */);
                            }
                            else {
                                const statement = factory.createVariableStatement(
                                /*modifiers*/
                                void 0, factory.createVariableDeclarationList([
                                    factory.createVariableDeclaration(varName, 
                                    /*exclamationToken*/
                                    void 0, serializeTypeForDeclaration(context, typeToSerialize, symbol, enclosingDeclaration, includePrivateSymbol, bundled))
                                ], 2 /* Const */));
                                addResult(statement, target && target.flags & 4 /* Property */ && target.escapedName === "export=" /* ExportEquals */ ? 2 /* Ambient */ : name === varName ? 1 /* Export */ : 0 /* None */);
                            }
                            if (isExportAssignmentCompatibleSymbolName) {
                                results.push(factory.createExportAssignment(
                                /*modifiers*/
                                void 0, isExportEquals, factory.createIdentifier(varName)));
                                return true;
                            }
                            else if (name !== varName) {
                                serializeExportSpecifier(name, varName);
                                return true;
                            }
                            return false;
                        }
                    }