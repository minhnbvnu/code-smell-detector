function isAllowedStatementToMove(statement) {
            return !isPureImport(statement) && !isPrologueDirective(statement);
        }