function getPartOfForStatementContainingNode(node, container) {
                return findAncestor(node, (n) => n === container ? "quit" : n === container.initializer || n === container.condition || n === container.incrementor || n === container.statement);
            }