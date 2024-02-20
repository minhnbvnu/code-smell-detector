function transformAndEmitStatements(statements2, start = 0) {
                const numStatements = statements2.length;
                for (let i = start; i < numStatements; i++) {
                    transformAndEmitStatement(statements2[i]);
                }
            }