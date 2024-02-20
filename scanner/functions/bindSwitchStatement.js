function bindSwitchStatement(node) {
                const postSwitchLabel = createBranchLabel();
                bind(node.expression);
                const saveBreakTarget = currentBreakTarget;
                const savePreSwitchCaseFlow = preSwitchCaseFlow;
                currentBreakTarget = postSwitchLabel;
                preSwitchCaseFlow = currentFlow;
                bind(node.caseBlock);
                addAntecedent(postSwitchLabel, currentFlow);
                const hasDefault = forEach(node.caseBlock.clauses, (c) => c.kind === 293 /* DefaultClause */);
                node.possiblyExhaustive = !hasDefault && !postSwitchLabel.antecedents;
                if (!hasDefault) {
                    addAntecedent(postSwitchLabel, createFlowSwitchClause(preSwitchCaseFlow, node, 0, 0));
                }
                currentBreakTarget = saveBreakTarget;
                preSwitchCaseFlow = savePreSwitchCaseFlow;
                currentFlow = finishFlowLabel(postSwitchLabel);
            }