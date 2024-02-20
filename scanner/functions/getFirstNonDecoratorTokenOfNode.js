function getFirstNonDecoratorTokenOfNode(node) {
                if (canHaveModifiers(node)) {
                    const modifier = find(node.modifiers, isModifier, findIndex(node.modifiers, isDecorator));
                    if (modifier)
                        return modifier.kind;
                }
                switch (node.kind) {
                    case 260 /* ClassDeclaration */:
                        return 84 /* ClassKeyword */;
                    case 261 /* InterfaceDeclaration */:
                        return 118 /* InterfaceKeyword */;
                    case 259 /* FunctionDeclaration */:
                        return 98 /* FunctionKeyword */;
                    case 263 /* EnumDeclaration */:
                        return 263 /* EnumDeclaration */;
                    case 174 /* GetAccessor */:
                        return 137 /* GetKeyword */;
                    case 175 /* SetAccessor */:
                        return 151 /* SetKeyword */;
                    case 171 /* MethodDeclaration */:
                        if (node.asteriskToken) {
                            return 41 /* AsteriskToken */;
                        }
                    case 169 /* PropertyDeclaration */:
                    case 166 /* Parameter */:
                        const name = getNameOfDeclaration(node);
                        if (name) {
                            return name.kind;
                        }
                }
            }