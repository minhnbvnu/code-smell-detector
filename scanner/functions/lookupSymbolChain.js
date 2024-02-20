function lookupSymbolChain(symbol, context, meaning, yieldModuleSymbol) {
                    context.tracker.trackSymbol(symbol, context.enclosingDeclaration, meaning);
                    return lookupSymbolChainWorker(symbol, context, meaning, yieldModuleSymbol);
                }