function findUseStrictPrologue(statements) {
            for (const statement of statements) {
                if (isPrologueDirective(statement)) {
                    if (isUseStrictPrologue(statement)) {
                        return statement;
                    }
                }
                else {
                    break;
                }
            }
            return void 0;
        }