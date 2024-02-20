function checkForInOrForOfVariableDeclaration(iterationStatement) {
                const variableDeclarationList = iterationStatement.initializer;
                if (variableDeclarationList.declarations.length >= 1) {
                    const decl = variableDeclarationList.declarations[0];
                    checkVariableDeclaration(decl);
                }
            }