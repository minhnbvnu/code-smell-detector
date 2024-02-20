function finishFlowLabel(flow) {
                const antecedents = flow.antecedents;
                if (!antecedents) {
                    return unreachableFlow;
                }
                if (antecedents.length === 1) {
                    return antecedents[0];
                }
                return flow;
            }