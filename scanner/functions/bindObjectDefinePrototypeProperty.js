function bindObjectDefinePrototypeProperty(node) {
                const namespaceSymbol = lookupSymbolForPropertyAccess(node.arguments[0].expression);
                if (namespaceSymbol && namespaceSymbol.valueDeclaration) {
                    addDeclarationToSymbol(namespaceSymbol, namespaceSymbol.valueDeclaration, 32 /* Class */);
                }
                bindPotentiallyNewExpandoMemberToNamespace(node, namespaceSymbol, 
                /*isPrototypeProperty*/
                true);
            }