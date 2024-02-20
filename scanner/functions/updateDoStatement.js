function updateDoStatement(node, statement, expression) {
                return node.statement !== statement || node.expression !== expression ? update(createDoStatement(statement, expression), node) : node;
            }