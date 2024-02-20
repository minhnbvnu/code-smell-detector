function insertStatementAfterCustomPrologue(to, statement) {
            return insertStatementAfterPrologue(to, statement, isAnyPrologueDirective);
        }