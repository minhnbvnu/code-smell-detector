function updateSwitchStatement(node, expression, caseBlock) {
                return node.expression !== expression || node.caseBlock !== caseBlock ? update(createSwitchStatement(expression, caseBlock), node) : node;
            }