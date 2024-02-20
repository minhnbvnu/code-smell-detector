function isFunctionType(node) {
                var _a;
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                const type = checker.getTypeAtLocation(tsNode);
                const symbol = type.getSymbol();
                if (symbol &&
                    tsutils.isSymbolFlagSet(symbol, ts.SymbolFlags.Function | ts.SymbolFlags.Method)) {
                    return true;
                }
                if (symbol && symbol.escapedName === FUNCTION_CONSTRUCTOR) {
                    const declarations = (_a = symbol.getDeclarations()) !== null && _a !== void 0 ? _a : [];
                    for (const declaration of declarations) {
                        const sourceFile = declaration.getSourceFile();
                        if (program.isSourceFileDefaultLibrary(sourceFile)) {
                            return true;
                        }
                    }
                }
                const signatures = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
                return signatures.length > 0;
            }