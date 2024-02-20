function bindLabeledStatement(node) {
                const postStatementLabel = createBranchLabel();
                activeLabelList = {
                    next: activeLabelList,
                    name: node.label.escapedText,
                    breakTarget: postStatementLabel,
                    continueTarget: void 0,
                    referenced: false
                };
                bind(node.label);
                bind(node.statement);
                if (!activeLabelList.referenced && !options.allowUnusedLabels) {
                    errorOrSuggestionOnNode(unusedLabelIsError(options), node.label, Diagnostics.Unused_label);
                }
                activeLabelList = activeLabelList.next;
                addAntecedent(postStatementLabel, currentFlow);
                currentFlow = finishFlowLabel(postStatementLabel);
            }