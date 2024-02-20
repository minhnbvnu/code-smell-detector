function checkLabeledStatement(node) {
                if (!checkGrammarStatementInAmbientContext(node)) {
                    findAncestor(node.parent, (current) => {
                        if (isFunctionLike(current)) {
                            return "quit";
                        }
                        if (current.kind === 253 /* LabeledStatement */ && current.label.escapedText === node.label.escapedText) {
                            grammarErrorOnNode(node.label, Diagnostics.Duplicate_label_0, getTextOfNode(node.label));
                            return true;
                        }
                        return false;
                    });
                }
                checkSourceElement(node.statement);
            }