function tryParseConstraintOfInferType() {
                        if (parseOptional(94 /* ExtendsKeyword */)) {
                            const constraint = disallowConditionalTypesAnd(parseType);
                            if (inDisallowConditionalTypesContext() || token() !== 57 /* QuestionToken */) {
                                return constraint;
                            }
                        }
                    }