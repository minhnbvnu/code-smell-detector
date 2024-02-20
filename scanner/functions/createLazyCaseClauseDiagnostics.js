function createLazyCaseClauseDiagnostics(clause2) {
                        return () => {
                            const caseType = checkExpression(clause2.expression);
                            if (!isTypeEqualityComparableTo(expressionType, caseType)) {
                                checkTypeComparableTo(caseType, expressionType, clause2.expression, 
                                /*headMessage*/
                                void 0);
                            }
                        };
                    }