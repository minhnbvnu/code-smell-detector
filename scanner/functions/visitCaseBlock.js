function visitCaseBlock(node) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = factory2.updateCaseBlock(node, visitNodes2(node.clauses, topLevelNestedVisitor, isCaseOrDefaultClause));
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }