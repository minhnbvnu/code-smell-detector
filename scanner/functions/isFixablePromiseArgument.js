function isFixablePromiseArgument(arg, checker) {
            switch (arg.kind) {
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                    const functionFlags = getFunctionFlags(arg);
                    if (functionFlags & 1 /* Generator */) {
                        return false;
                    }
                case 216 /* ArrowFunction */:
                    visitedNestedConvertibleFunctions.set(getKeyFromNode(arg), true);
                case 104 /* NullKeyword */:
                    return true;
                case 79 /* Identifier */:
                case 208 /* PropertyAccessExpression */: {
                    const symbol = checker.getSymbolAtLocation(arg);
                    if (!symbol) {
                        return false;
                    }
                    return checker.isUndefinedSymbol(symbol) || some(skipAlias(symbol, checker).declarations, (d) => isFunctionLike(d) || hasInitializer(d) && !!d.initializer && isFunctionLike(d.initializer));
                }
                default:
                    return false;
            }
        }