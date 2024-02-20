function bindInitializedVariableFlow(node) {
                const name = !isOmittedExpression(node) ? node.name : void 0;
                if (isBindingPattern(name)) {
                    for (const child of name.elements) {
                        bindInitializedVariableFlow(child);
                    }
                }
                else {
                    currentFlow = createFlowMutation(16 /* Assignment */, currentFlow, node);
                }
            }