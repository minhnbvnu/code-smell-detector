function updateCatchClause(node, variableDeclaration, block) {
                return node.variableDeclaration !== variableDeclaration || node.block !== block ? update(createCatchClause(variableDeclaration, block), node) : node;
            }