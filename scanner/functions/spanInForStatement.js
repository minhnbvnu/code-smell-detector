function spanInForStatement(forStatement) {
                    if (forStatement.initializer) {
                        return spanInInitializerOfForLike(forStatement);
                    }
                    if (forStatement.condition) {
                        return textSpan(forStatement.condition);
                    }
                    if (forStatement.incrementor) {
                        return textSpan(forStatement.incrementor);
                    }
                }