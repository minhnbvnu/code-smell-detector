function bindCaseClause(node) {
                const saveCurrentFlow = currentFlow;
                currentFlow = preSwitchCaseFlow;
                bind(node.expression);
                currentFlow = saveCurrentFlow;
                bindEach(node.statements);
            }