function parseReturnType(returnToken, isType) {
                        if (shouldParseReturnType(returnToken, isType)) {
                            return allowConditionalTypesAnd(parseTypeOrTypePredicate);
                        }
                    }