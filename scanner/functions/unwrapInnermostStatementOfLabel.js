function unwrapInnermostStatementOfLabel(node, beforeUnwrapLabelCallback) {
            while (true) {
                if (beforeUnwrapLabelCallback) {
                    beforeUnwrapLabelCallback(node);
                }
                if (node.statement.kind !== 253 /* LabeledStatement */) {
                    return node.statement;
                }
                node = node.statement;
            }
        }