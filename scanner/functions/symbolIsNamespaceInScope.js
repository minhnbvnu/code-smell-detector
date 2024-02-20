function symbolIsNamespaceInScope(symbol) {
                var _a;
                const symbolDeclarations = (_a = symbol.getDeclarations()) !== null && _a !== void 0 ? _a : [];
                if (symbolDeclarations.some(decl => namespacesInScope.some(ns => ns === decl))) {
                    return true;
                }
                const alias = tryGetAliasedSymbol(symbol, checker);
                return alias != null && symbolIsNamespaceInScope(alias);
            }