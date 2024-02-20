function bindBreakOrContinueFlow(node, breakTarget, continueTarget) {
                const flowLabel = node.kind === 249 /* BreakStatement */ ? breakTarget : continueTarget;
                if (flowLabel) {
                    addAntecedent(flowLabel, currentFlow);
                    currentFlow = unreachableFlow;
                }
            }