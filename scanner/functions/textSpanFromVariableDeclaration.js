function textSpanFromVariableDeclaration(variableDeclaration) {
                    if (isVariableDeclarationList(variableDeclaration.parent) && variableDeclaration.parent.declarations[0] === variableDeclaration) {
                        return textSpan(findPrecedingToken(variableDeclaration.pos, sourceFile, variableDeclaration.parent), variableDeclaration);
                    }
                    else {
                        return textSpan(variableDeclaration);
                    }
                }