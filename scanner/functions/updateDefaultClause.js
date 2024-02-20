function updateDefaultClause(node, statements) {
                return node.statements !== statements ? update(createDefaultClause(statements), node) : node;
            }