function restoreEnclosingLabel(node, outermostLabeledStatement, afterRestoreLabelCallback) {
                if (!outermostLabeledStatement) {
                    return node;
                }
                const updated = updateLabeledStatement(outermostLabeledStatement, outermostLabeledStatement.label, isLabeledStatement(outermostLabeledStatement.statement) ? restoreEnclosingLabel(node, outermostLabeledStatement.statement) : node);
                if (afterRestoreLabelCallback) {
                    afterRestoreLabelCallback(outermostLabeledStatement);
                }
                return updated;
            }