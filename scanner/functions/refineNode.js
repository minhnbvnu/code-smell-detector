function refineNode(node2) {
                if (isReturnStatement(node2)) {
                    if (node2.expression) {
                        return node2.expression;
                    }
                }
                else if (isVariableStatement(node2) || isVariableDeclarationList(node2)) {
                    const declarations = isVariableStatement(node2) ? node2.declarationList.declarations : node2.declarations;
                    let numInitializers = 0;
                    let lastInitializer;
                    for (const declaration of declarations) {
                        if (declaration.initializer) {
                            numInitializers++;
                            lastInitializer = declaration.initializer;
                        }
                    }
                    if (numInitializers === 1) {
                        return lastInitializer;
                    }
                }
                else if (isVariableDeclaration(node2)) {
                    if (node2.initializer) {
                        return node2.initializer;
                    }
                }
                return node2;
            }