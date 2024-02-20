function visitHeritageClause(node) {
                if (node.token === 117 /* ImplementsKeyword */) {
                    return void 0;
                }
                return visitEachChild(node, visitor, context);
            }