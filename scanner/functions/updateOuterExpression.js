function updateOuterExpression(outerExpression, expression) {
                switch (outerExpression.kind) {
                    case 214 /* ParenthesizedExpression */:
                        return updateParenthesizedExpression(outerExpression, expression);
                    case 213 /* TypeAssertionExpression */:
                        return updateTypeAssertion(outerExpression, outerExpression.type, expression);
                    case 231 /* AsExpression */:
                        return updateAsExpression(outerExpression, expression, outerExpression.type);
                    case 235 /* SatisfiesExpression */:
                        return updateSatisfiesExpression(outerExpression, expression, outerExpression.type);
                    case 232 /* NonNullExpression */:
                        return updateNonNullExpression(outerExpression, expression);
                    case 356 /* PartiallyEmittedExpression */:
                        return updatePartiallyEmittedExpression(outerExpression, expression);
                }
            }