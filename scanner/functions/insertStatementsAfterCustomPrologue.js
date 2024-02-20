function insertStatementsAfterCustomPrologue(to, from) {
            return insertStatementsAfterPrologue(to, from, isAnyPrologueDirective);
        }