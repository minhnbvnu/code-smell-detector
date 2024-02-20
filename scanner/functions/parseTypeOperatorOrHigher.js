function parseTypeOperatorOrHigher() {
                        const operator = token();
                        switch (operator) {
                            case 141 /* KeyOfKeyword */:
                            case 156 /* UniqueKeyword */:
                            case 146 /* ReadonlyKeyword */:
                                return parseTypeOperator(operator);
                            case 138 /* InferKeyword */:
                                return parseInferType();
                        }
                        return allowConditionalTypesAnd(parsePostfixTypeOrHigher);
                    }