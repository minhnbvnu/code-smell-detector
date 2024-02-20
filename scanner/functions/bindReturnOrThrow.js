function bindReturnOrThrow(node) {
                bind(node.expression);
                if (node.kind === 250 /* ReturnStatement */) {
                    hasExplicitReturn = true;
                    if (currentReturnTarget) {
                        addAntecedent(currentReturnTarget, currentFlow);
                    }
                }
                currentFlow = unreachableFlow;
            }