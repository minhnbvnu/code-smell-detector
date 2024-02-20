function findSuperStatementIndex(statements, indexAfterLastPrologueStatement) {
            for (let i = indexAfterLastPrologueStatement; i < statements.length; i += 1) {
                const statement = statements[i];
                if (getSuperCallFromStatement(statement)) {
                    return i;
                }
            }
            return -1;
        }