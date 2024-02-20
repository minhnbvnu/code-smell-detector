function shouldWriteTypeOfFunctionSymbol() {
                            var _a4;
                            const isStaticMethodSymbol = !!(symbol.flags & 8192 /* Method */) && // typeof static method
                                some(symbol.declarations, (declaration) => isStatic(declaration));
                            const isNonLocalFunctionSymbol = !!(symbol.flags & 16 /* Function */) && (symbol.parent || // is exported function symbol
                                forEach(symbol.declarations, (declaration) => declaration.parent.kind === 308 /* SourceFile */ || declaration.parent.kind === 265 /* ModuleBlock */));
                            if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                                return (!!(context.flags & 4096 /* UseTypeOfFunction */) || ((_a4 = context.visitedTypes) == null ? void 0 : _a4.has(typeId))) && // it is type of the symbol uses itself recursively
                                    (!(context.flags & 8 /* UseStructuralFallback */) || isValueSymbolAccessible(symbol, context.enclosingDeclaration));
                            }
                        }