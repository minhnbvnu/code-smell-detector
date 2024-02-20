function transformAndEmitStatement(node) {
                const savedInStatementContainingYield = inStatementContainingYield;
                if (!inStatementContainingYield) {
                    inStatementContainingYield = containsYield(node);
                }
                transformAndEmitStatementWorker(node);
                inStatementContainingYield = savedInStatementContainingYield;
            }