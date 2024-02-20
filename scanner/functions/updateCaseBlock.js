function updateCaseBlock(node, clauses) {
                return node.clauses !== clauses ? update(createCaseBlock(clauses), node) : node;
            }