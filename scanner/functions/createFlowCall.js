function createFlowCall(antecedent, node) {
                setFlowNodeReferenced(antecedent);
                return initFlowNode({ flags: 512 /* Call */, antecedent, node });
            }