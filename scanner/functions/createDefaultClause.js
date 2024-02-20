function createDefaultClause(statements) {
                const node = createBaseNode(293 /* DefaultClause */);
                node.statements = createNodeArray(statements);
                node.transformFlags = propagateChildrenFlags(node.statements);
                return node;
            }