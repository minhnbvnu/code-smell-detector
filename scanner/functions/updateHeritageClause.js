function updateHeritageClause(node, types) {
                return node.types !== types ? update(createHeritageClause(node.token, types), node) : node;
            }