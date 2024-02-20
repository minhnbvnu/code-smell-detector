function insertStatementsAfterPrologue(to, from, isPrologueDirective2) {
            if (from === void 0 || from.length === 0)
                return to;
            let statementIndex = 0;
            for (; statementIndex < to.length; ++statementIndex) {
                if (!isPrologueDirective2(to[statementIndex])) {
                    break;
                }
            }
            to.splice(statementIndex, 0, ...from);
            return to;
        }