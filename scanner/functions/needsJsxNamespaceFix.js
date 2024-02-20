function needsJsxNamespaceFix(jsxNamespace, symbolToken, checker) {
            if (isIntrinsicJsxName(symbolToken.text))
                return true;
            const namespaceSymbol = checker.resolveName(jsxNamespace, symbolToken, 111551 /* Value */, 
            /*excludeGlobals*/
            true);
            return !namespaceSymbol || some(namespaceSymbol.declarations, isTypeOnlyImportOrExportDeclaration) && !(namespaceSymbol.flags & 111551 /* Value */);
        }