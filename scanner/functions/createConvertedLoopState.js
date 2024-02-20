function createConvertedLoopState(node) {
                let loopInitializer;
                switch (node.kind) {
                    case 245 /* ForStatement */:
                    case 246 /* ForInStatement */:
                    case 247 /* ForOfStatement */:
                        const initializer = node.initializer;
                        if (initializer && initializer.kind === 258 /* VariableDeclarationList */) {
                            loopInitializer = initializer;
                        }
                        break;
                }
                const loopParameters = [];
                const loopOutParameters = [];
                if (loopInitializer && getCombinedNodeFlags(loopInitializer) & 3 /* BlockScoped */) {
                    const hasCapturedBindingsInForHead = shouldConvertInitializerOfForStatement(node) || shouldConvertConditionOfForStatement(node) || shouldConvertIncrementorOfForStatement(node);
                    for (const decl of loopInitializer.declarations) {
                        processLoopVariableDeclaration(node, decl, loopParameters, loopOutParameters, hasCapturedBindingsInForHead);
                    }
                }
                const currentState = { loopParameters, loopOutParameters };
                if (convertedLoopState) {
                    if (convertedLoopState.argumentsName) {
                        currentState.argumentsName = convertedLoopState.argumentsName;
                    }
                    if (convertedLoopState.thisName) {
                        currentState.thisName = convertedLoopState.thisName;
                    }
                    if (convertedLoopState.hoistedLocalVariables) {
                        currentState.hoistedLocalVariables = convertedLoopState.hoistedLocalVariables;
                    }
                }
                return currentState;
            }