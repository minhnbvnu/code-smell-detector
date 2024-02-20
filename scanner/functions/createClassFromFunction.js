function createClassFromFunction(node) {
                const memberElements = createClassElementsFromSymbol(ctorSymbol);
                if (node.body) {
                    memberElements.unshift(factory.createConstructorDeclaration(
                    /*modifiers*/
                    void 0, node.parameters, node.body));
                }
                const modifiers = getModifierKindFromSource(node, 93 /* ExportKeyword */);
                const cls = factory.createClassDeclaration(modifiers, node.name, 
                /*typeParameters*/
                void 0, 
                /*heritageClauses*/
                void 0, memberElements);
                return cls;
            }