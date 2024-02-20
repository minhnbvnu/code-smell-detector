function removeToken() {
                        return (fixer) => {
                            const operator = sourceCode.getTokenAfter(node.expression, util.isNonNullAssertionPunctuator);
                            if (operator) {
                                return fixer.remove(operator);
                            }
                            return null;
                        };
                    }