function bindInitializer(node) {
                if (!node) {
                    return;
                }
                const entryFlow = currentFlow;
                bind(node);
                if (entryFlow === unreachableFlow || entryFlow === currentFlow) {
                    return;
                }
                const exitFlow = createBranchLabel();
                addAntecedent(exitFlow, entryFlow);
                addAntecedent(exitFlow, currentFlow);
                currentFlow = finishFlowLabel(exitFlow);
            }