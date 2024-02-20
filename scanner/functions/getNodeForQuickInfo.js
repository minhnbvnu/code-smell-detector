function getNodeForQuickInfo(node) {
                if (isNewExpression(node.parent) && node.pos === node.parent.pos) {
                    return node.parent.expression;
                }
                if (isNamedTupleMember(node.parent) && node.pos === node.parent.pos) {
                    return node.parent;
                }
                if (isImportMeta(node.parent) && node.parent.name === node) {
                    return node.parent;
                }
                return node;
            }