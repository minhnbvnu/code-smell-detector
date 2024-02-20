function transformAndEmitVariableDeclarationList(node) {
                for (const variable of node.declarations) {
                    const name = factory2.cloneNode(variable.name);
                    setCommentRange(name, variable.name);
                    hoistVariableDeclaration(name);
                }
                const variables = getInitializedVariables(node);
                const numVariables = variables.length;
                let variablesWritten = 0;
                let pendingExpressions = [];
                while (variablesWritten < numVariables) {
                    for (let i = variablesWritten; i < numVariables; i++) {
                        const variable = variables[i];
                        if (containsYield(variable.initializer) && pendingExpressions.length > 0) {
                            break;
                        }
                        pendingExpressions.push(transformInitializedVariable(variable));
                    }
                    if (pendingExpressions.length) {
                        emitStatement(factory2.createExpressionStatement(factory2.inlineExpressions(pendingExpressions)));
                        variablesWritten += pendingExpressions.length;
                        pendingExpressions = [];
                    }
                }
                return void 0;
            }