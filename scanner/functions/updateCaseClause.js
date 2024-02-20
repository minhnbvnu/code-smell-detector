function updateCaseClause(node, expression, statements) {
                return node.expression !== expression || node.statements !== statements ? update(createCaseClause(expression, statements), node) : node;
            }