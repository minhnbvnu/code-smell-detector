function convertTokenToOptional(replacement) {
                        return (fixer) => {
                            const operator = sourceCode.getTokenAfter(node.expression, util.isNonNullAssertionPunctuator);
                            if (operator) {
                                return fixer.replaceText(operator, replacement);
                            }
                            return null;
                        };
                    }