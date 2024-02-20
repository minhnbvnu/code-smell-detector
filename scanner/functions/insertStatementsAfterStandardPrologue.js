function insertStatementsAfterStandardPrologue(to, from) {
            return insertStatementsAfterPrologue(to, from, isPrologueDirective);
        }