function createFlowMutation(flags, antecedent, node) {
                setFlowNodeReferenced(antecedent);
                const result = initFlowNode({ flags, antecedent, node });
                if (currentExceptionTarget) {
                    addAntecedent(currentExceptionTarget, result);
                }
                return result;
            }