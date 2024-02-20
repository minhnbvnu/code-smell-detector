function bindTryStatement(node) {
                const saveReturnTarget = currentReturnTarget;
                const saveExceptionTarget = currentExceptionTarget;
                const normalExitLabel = createBranchLabel();
                const returnLabel = createBranchLabel();
                let exceptionLabel = createBranchLabel();
                if (node.finallyBlock) {
                    currentReturnTarget = returnLabel;
                }
                addAntecedent(exceptionLabel, currentFlow);
                currentExceptionTarget = exceptionLabel;
                bind(node.tryBlock);
                addAntecedent(normalExitLabel, currentFlow);
                if (node.catchClause) {
                    currentFlow = finishFlowLabel(exceptionLabel);
                    exceptionLabel = createBranchLabel();
                    addAntecedent(exceptionLabel, currentFlow);
                    currentExceptionTarget = exceptionLabel;
                    bind(node.catchClause);
                    addAntecedent(normalExitLabel, currentFlow);
                }
                currentReturnTarget = saveReturnTarget;
                currentExceptionTarget = saveExceptionTarget;
                if (node.finallyBlock) {
                    const finallyLabel = createBranchLabel();
                    finallyLabel.antecedents = concatenate(concatenate(normalExitLabel.antecedents, exceptionLabel.antecedents), returnLabel.antecedents);
                    currentFlow = finallyLabel;
                    bind(node.finallyBlock);
                    if (currentFlow.flags & 1 /* Unreachable */) {
                        currentFlow = unreachableFlow;
                    }
                    else {
                        if (currentReturnTarget && returnLabel.antecedents) {
                            addAntecedent(currentReturnTarget, createReduceLabel(finallyLabel, returnLabel.antecedents, currentFlow));
                        }
                        if (currentExceptionTarget && exceptionLabel.antecedents) {
                            addAntecedent(currentExceptionTarget, createReduceLabel(finallyLabel, exceptionLabel.antecedents, currentFlow));
                        }
                        currentFlow = normalExitLabel.antecedents ? createReduceLabel(finallyLabel, normalExitLabel.antecedents, currentFlow) : unreachableFlow;
                    }
                }
                else {
                    currentFlow = finishFlowLabel(normalExitLabel);
                }
            }