function createClassFromVariableDeclaration(node) {
                const initializer = node.initializer;
                if (!initializer || !isFunctionExpression(initializer) || !isIdentifier(node.name)) {
                    return void 0;
                }
                const memberElements = createClassElementsFromSymbol(node.symbol);
                if (initializer.body) {
                    memberElements.unshift(factory.createConstructorDeclaration(
                    /*modifiers*/
                    void 0, initializer.parameters, initializer.body));
                }
                const modifiers = getModifierKindFromSource(node.parent.parent, 93 /* ExportKeyword */);
                const cls = factory.createClassDeclaration(modifiers, node.name, 
                /*typeParameters*/
                void 0, 
                /*heritageClauses*/
                void 0, memberElements);
                return cls;
            }