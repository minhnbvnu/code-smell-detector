function addStatementToStartOfBlock(block, statement) {
                const transformedStatements = visitNodes2(block.statements, visitor, isStatement);
                return factory2.updateBlock(block, [statement, ...transformedStatements]);
            }