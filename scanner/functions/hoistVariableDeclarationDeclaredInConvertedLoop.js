function hoistVariableDeclarationDeclaredInConvertedLoop(state, node) {
                if (!state.hoistedLocalVariables) {
                    state.hoistedLocalVariables = [];
                }
                visit(node.name);
                function visit(node2) {
                    if (node2.kind === 79 /* Identifier */) {
                        state.hoistedLocalVariables.push(node2);
                    }
                    else {
                        for (const element of node2.elements) {
                            if (!isOmittedExpression(element)) {
                                visit(element.name);
                            }
                        }
                    }
                }
            }