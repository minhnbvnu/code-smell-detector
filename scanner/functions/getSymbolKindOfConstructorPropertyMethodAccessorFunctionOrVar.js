function getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, symbol, location) {
            const roots = typeChecker.getRootSymbols(symbol);
            if (roots.length === 1 && first(roots).flags & 8192 /* Method */ && typeChecker.getTypeOfSymbolAtLocation(symbol, location).getNonNullableType().getCallSignatures().length !== 0) {
                return "method" /* memberFunctionElement */;
            }
            if (typeChecker.isUndefinedSymbol(symbol)) {
                return "var" /* variableElement */;
            }
            if (typeChecker.isArgumentsSymbol(symbol)) {
                return "local var" /* localVariableElement */;
            }
            if (location.kind === 108 /* ThisKeyword */ && isExpression(location) || isThisInTypeQuery(location)) {
                return "parameter" /* parameterElement */;
            }
            const flags = getCombinedLocalAndExportSymbolFlags(symbol);
            if (flags & 3 /* Variable */) {
                if (isFirstDeclarationOfSymbolParameter(symbol)) {
                    return "parameter" /* parameterElement */;
                }
                else if (symbol.valueDeclaration && isVarConst(symbol.valueDeclaration)) {
                    return "const" /* constElement */;
                }
                else if (forEach(symbol.declarations, isLet)) {
                    return "let" /* letElement */;
                }
                return isLocalVariableOrFunction(symbol) ? "local var" /* localVariableElement */ : "var" /* variableElement */;
            }
            if (flags & 16 /* Function */)
                return isLocalVariableOrFunction(symbol) ? "local function" /* localFunctionElement */ : "function" /* functionElement */;
            if (flags & 32768 /* GetAccessor */)
                return "getter" /* memberGetAccessorElement */;
            if (flags & 65536 /* SetAccessor */)
                return "setter" /* memberSetAccessorElement */;
            if (flags & 8192 /* Method */)
                return "method" /* memberFunctionElement */;
            if (flags & 16384 /* Constructor */)
                return "constructor" /* constructorImplementationElement */;
            if (flags & 131072 /* Signature */)
                return "index" /* indexSignatureElement */;
            if (flags & 4 /* Property */) {
                if (flags & 33554432 /* Transient */ && symbol.links.checkFlags & 6 /* Synthetic */) {
                    const unionPropertyKind = forEach(typeChecker.getRootSymbols(symbol), (rootSymbol) => {
                        const rootSymbolFlags = rootSymbol.getFlags();
                        if (rootSymbolFlags & (98308 /* PropertyOrAccessor */ | 3 /* Variable */)) {
                            return "property" /* memberVariableElement */;
                        }
                    });
                    if (!unionPropertyKind) {
                        const typeOfUnionProperty = typeChecker.getTypeOfSymbolAtLocation(symbol, location);
                        if (typeOfUnionProperty.getCallSignatures().length) {
                            return "method" /* memberFunctionElement */;
                        }
                        return "property" /* memberVariableElement */;
                    }
                    return unionPropertyKind;
                }
                return "property" /* memberVariableElement */;
            }
            return "" /* unknown */;
        }