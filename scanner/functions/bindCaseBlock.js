function bindCaseBlock(node) {
                const clauses = node.clauses;
                const isNarrowingSwitch = isNarrowingExpression(node.parent.expression);
                let fallthroughFlow = unreachableFlow;
                for (let i = 0; i < clauses.length; i++) {
                    const clauseStart = i;
                    while (!clauses[i].statements.length && i + 1 < clauses.length) {
                        bind(clauses[i]);
                        i++;
                    }
                    const preCaseLabel = createBranchLabel();
                    addAntecedent(preCaseLabel, isNarrowingSwitch ? createFlowSwitchClause(preSwitchCaseFlow, node.parent, clauseStart, i + 1) : preSwitchCaseFlow);
                    addAntecedent(preCaseLabel, fallthroughFlow);
                    currentFlow = finishFlowLabel(preCaseLabel);
                    const clause = clauses[i];
                    bind(clause);
                    fallthroughFlow = currentFlow;
                    if (!(currentFlow.flags & 1 /* Unreachable */) && i !== clauses.length - 1 && options.noFallthroughCasesInSwitch) {
                        clause.fallthroughFlowNode = currentFlow;
                    }
                }
            }