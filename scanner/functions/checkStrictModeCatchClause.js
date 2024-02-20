function checkStrictModeCatchClause(node) {
                if (inStrictMode && node.variableDeclaration) {
                    checkStrictModeEvalOrArguments(node, node.variableDeclaration.name);
                }
            }