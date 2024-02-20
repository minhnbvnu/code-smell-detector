function visitCatchClause(node) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = factory2.updateCatchClause(node, node.variableDeclaration, Debug.checkDefined(visitNode(node.block, topLevelNestedVisitor, isBlock)));
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }