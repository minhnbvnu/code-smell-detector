function isSufficientlyCoveredByReturnStatements(statement) {
                if (statement.kind === 250 /* ReturnStatement */) {
                    return true;
                }
                else if (statement.kind === 242 /* IfStatement */) {
                    const ifStatement = statement;
                    if (ifStatement.elseStatement) {
                        return isSufficientlyCoveredByReturnStatements(ifStatement.thenStatement) && isSufficientlyCoveredByReturnStatements(ifStatement.elseStatement);
                    }
                }
                else if (statement.kind === 238 /* Block */) {
                    const lastStatement = lastOrUndefined(statement.statements);
                    if (lastStatement && isSufficientlyCoveredByReturnStatements(lastStatement)) {
                        return true;
                    }
                }
                return false;
            }