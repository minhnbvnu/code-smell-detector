function recordUsagebySymbol(identifier, usage, isTypeName) {
                const symbol = getSymbolReferencedByIdentifier(identifier);
                if (!symbol) {
                    return void 0;
                }
                const symbolId = getSymbolId(symbol).toString();
                const lastUsage = seenUsages.get(symbolId);
                if (lastUsage && lastUsage >= usage) {
                    return symbolId;
                }
                seenUsages.set(symbolId, usage);
                if (lastUsage) {
                    for (const perScope of usagesPerScope) {
                        const prevEntry = perScope.usages.get(identifier.text);
                        if (prevEntry) {
                            perScope.usages.set(identifier.text, { usage, symbol, node: identifier });
                        }
                    }
                    return symbolId;
                }
                const decls = symbol.getDeclarations();
                const declInFile = decls && find(decls, (d) => d.getSourceFile() === sourceFile);
                if (!declInFile) {
                    return void 0;
                }
                if (rangeContainsStartEnd(enclosingTextRange, declInFile.getStart(), declInFile.end)) {
                    return void 0;
                }
                if (targetRange.facts & 2 /* IsGenerator */ && usage === 2 /* Write */) {
                    const diag2 = createDiagnosticForNode(identifier, Messages.cannotExtractRangeThatContainsWritesToReferencesLocatedOutsideOfTheTargetRangeInGenerators);
                    for (const errors of functionErrorsPerScope) {
                        errors.push(diag2);
                    }
                    for (const errors of constantErrorsPerScope) {
                        errors.push(diag2);
                    }
                }
                for (let i = 0; i < scopes.length; i++) {
                    const scope = scopes[i];
                    const resolvedSymbol = checker.resolveName(symbol.name, scope, symbol.flags, 
                    /*excludeGlobals*/
                    false);
                    if (resolvedSymbol === symbol) {
                        continue;
                    }
                    if (!substitutionsPerScope[i].has(symbolId)) {
                        const substitution = tryReplaceWithQualifiedNameOrPropertyAccess(symbol.exportSymbol || symbol, scope, isTypeName);
                        if (substitution) {
                            substitutionsPerScope[i].set(symbolId, substitution);
                        }
                        else if (isTypeName) {
                            if (!(symbol.flags & 262144 /* TypeParameter */)) {
                                const diag2 = createDiagnosticForNode(identifier, Messages.typeWillNotBeVisibleInTheNewScope);
                                functionErrorsPerScope[i].push(diag2);
                                constantErrorsPerScope[i].push(diag2);
                            }
                        }
                        else {
                            usagesPerScope[i].usages.set(identifier.text, { usage, symbol, node: identifier });
                        }
                    }
                }
                return symbolId;
            }