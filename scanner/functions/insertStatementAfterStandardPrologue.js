function insertStatementAfterStandardPrologue(to, statement) {
            return insertStatementAfterPrologue(to, statement, isPrologueDirective);
        }