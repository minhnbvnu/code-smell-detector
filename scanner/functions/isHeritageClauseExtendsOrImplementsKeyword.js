function isHeritageClauseExtendsOrImplementsKeyword() {
                        if (token() === 117 /* ImplementsKeyword */ || token() === 94 /* ExtendsKeyword */) {
                            return lookAhead(nextTokenIsStartOfExpression);
                        }
                        return false;
                    }