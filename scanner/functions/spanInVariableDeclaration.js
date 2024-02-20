function spanInVariableDeclaration(variableDeclaration) {
                    if (variableDeclaration.parent.parent.kind === 246 /* ForInStatement */) {
                        return spanInNode(variableDeclaration.parent.parent);
                    }
                    const parent2 = variableDeclaration.parent;
                    if (isBindingPattern(variableDeclaration.name)) {
                        return spanInBindingPattern(variableDeclaration.name);
                    }
                    if (hasOnlyExpressionInitializer(variableDeclaration) && variableDeclaration.initializer || hasSyntacticModifier(variableDeclaration, 1 /* Export */) || parent2.parent.kind === 247 /* ForOfStatement */) {
                        return textSpanFromVariableDeclaration(variableDeclaration);
                    }
                    if (isVariableDeclarationList(variableDeclaration.parent) && variableDeclaration.parent.declarations[0] !== variableDeclaration) {
                        return spanInNode(findPrecedingToken(variableDeclaration.pos, sourceFile, variableDeclaration.parent));
                    }
                }