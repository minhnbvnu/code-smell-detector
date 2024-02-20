function getTypeOfSwitchClause(clause) {
                if (clause.kind === 292 /* CaseClause */) {
                    return getRegularTypeOfLiteralType(getTypeOfExpression(clause.expression));
                }
                return neverType;
            }