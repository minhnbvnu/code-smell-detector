function createFlowSwitchClause(antecedent, switchStatement, clauseStart, clauseEnd) {
                setFlowNodeReferenced(antecedent);
                return initFlowNode({ flags: 128 /* SwitchClause */, antecedent, switchStatement, clauseStart, clauseEnd });
            }