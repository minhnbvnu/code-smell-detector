function insertStatementAfterPrologue(to, statement, isPrologueDirective2) {
            if (statement === void 0)
                return to;
            let statementIndex = 0;
            for (; statementIndex < to.length; ++statementIndex) {
                if (!isPrologueDirective2(to[statementIndex])) {
                    break;
                }
            }
            to.splice(statementIndex, 0, statement);
            return to;
        }