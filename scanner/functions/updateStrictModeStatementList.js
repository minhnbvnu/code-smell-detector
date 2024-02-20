function updateStrictModeStatementList(statements) {
                if (!inStrictMode) {
                    for (const statement of statements) {
                        if (!isPrologueDirective(statement)) {
                            return;
                        }
                        if (isUseStrictPrologueDirective(statement)) {
                            inStrictMode = true;
                            return;
                        }
                    }
                }
            }