function serializeSymbol(symbol, isPrivate, propertyAsAlias) {
                        const visitedSym = getMergedSymbol(symbol);
                        if (visitedSymbols.has(getSymbolId(visitedSym))) {
                            return;
                        }
                        visitedSymbols.add(getSymbolId(visitedSym));
                        const skipMembershipCheck = !isPrivate;
                        if (skipMembershipCheck || !!length(symbol.declarations) && some(symbol.declarations, (d) => !!findAncestor(d, (n) => n === enclosingDeclaration))) {
                            const oldContext = context;
                            context = cloneNodeBuilderContext(context);
                            serializeSymbolWorker(symbol, isPrivate, propertyAsAlias);
                            if (context.reportedDiagnostic) {
                                oldcontext.reportedDiagnostic = context.reportedDiagnostic;
                            }
                            context = oldContext;
                        }
                    }