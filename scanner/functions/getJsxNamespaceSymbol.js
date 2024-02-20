function getJsxNamespaceSymbol(containsJsx2) {
                if (containsJsx2 === void 0) {
                    return void 0;
                }
                const jsxNamespace = checker.getJsxNamespace(containsJsx2);
                const jsxNamespaceSymbol2 = checker.resolveName(jsxNamespace, containsJsx2, 1920 /* Namespace */, 
                /*excludeGlobals*/
                true);
                return !!jsxNamespaceSymbol2 && some(jsxNamespaceSymbol2.declarations, isInImport) ? jsxNamespaceSymbol2 : void 0;
            }