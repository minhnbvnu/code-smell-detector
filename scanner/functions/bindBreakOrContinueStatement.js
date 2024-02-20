function bindBreakOrContinueStatement(node) {
                bind(node.label);
                if (node.label) {
                    const activeLabel = findActiveLabel(node.label.escapedText);
                    if (activeLabel) {
                        activeLabel.referenced = true;
                        bindBreakOrContinueFlow(node, activeLabel.breakTarget, activeLabel.continueTarget);
                    }
                }
                else {
                    bindBreakOrContinueFlow(node, currentBreakTarget, currentContinueTarget);
                }
            }