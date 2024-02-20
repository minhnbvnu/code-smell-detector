function groupReferences(referenceEntries) {
                const classReferences = { accessExpressions: [], typeUsages: [] };
                const groupedReferences2 = { functionCalls: [], declarations: [], classReferences, valid: true };
                const functionSymbols = map(functionNames, getSymbolTargetAtLocation);
                const classSymbols = map(classNames, getSymbolTargetAtLocation);
                const isConstructor = isConstructorDeclaration(functionDeclaration);
                const contextualSymbols = map(functionNames, (name) => getSymbolForContextualType(name, checker));
                for (const entry of referenceEntries) {
                    if (entry.kind === ts_FindAllReferences_exports.EntryKind.Span) {
                        groupedReferences2.valid = false;
                        continue;
                    }
                    if (contains(contextualSymbols, getSymbolTargetAtLocation(entry.node))) {
                        if (isValidMethodSignature(entry.node.parent)) {
                            groupedReferences2.signature = entry.node.parent;
                            continue;
                        }
                        const call = entryToFunctionCall(entry);
                        if (call) {
                            groupedReferences2.functionCalls.push(call);
                            continue;
                        }
                    }
                    const contextualSymbol = getSymbolForContextualType(entry.node, checker);
                    if (contextualSymbol && contains(contextualSymbols, contextualSymbol)) {
                        const decl = entryToDeclaration(entry);
                        if (decl) {
                            groupedReferences2.declarations.push(decl);
                            continue;
                        }
                    }
                    if (contains(functionSymbols, getSymbolTargetAtLocation(entry.node)) || isNewExpressionTarget(entry.node)) {
                        const importOrExportReference = entryToImportOrExport(entry);
                        if (importOrExportReference) {
                            continue;
                        }
                        const decl = entryToDeclaration(entry);
                        if (decl) {
                            groupedReferences2.declarations.push(decl);
                            continue;
                        }
                        const call = entryToFunctionCall(entry);
                        if (call) {
                            groupedReferences2.functionCalls.push(call);
                            continue;
                        }
                    }
                    if (isConstructor && contains(classSymbols, getSymbolTargetAtLocation(entry.node))) {
                        const importOrExportReference = entryToImportOrExport(entry);
                        if (importOrExportReference) {
                            continue;
                        }
                        const decl = entryToDeclaration(entry);
                        if (decl) {
                            groupedReferences2.declarations.push(decl);
                            continue;
                        }
                        const accessExpression = entryToAccessExpression(entry);
                        if (accessExpression) {
                            classReferences.accessExpressions.push(accessExpression);
                            continue;
                        }
                        if (isClassDeclaration(functionDeclaration.parent)) {
                            const type = entryToType(entry);
                            if (type) {
                                classReferences.typeUsages.push(type);
                                continue;
                            }
                        }
                    }
                    groupedReferences2.valid = false;
                }
                return groupedReferences2;
            }