function isLabeledBy(node, labelName) {
                        return !!findAncestor(node.parent, (owner) => !isLabeledStatement(owner) ? "quit" : owner.label.escapedText === labelName);
                    }