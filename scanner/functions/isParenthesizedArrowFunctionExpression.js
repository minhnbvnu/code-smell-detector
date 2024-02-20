function isParenthesizedArrowFunctionExpression() {
                        if (token() === 20 /* OpenParenToken */ || token() === 29 /* LessThanToken */ || token() === 132 /* AsyncKeyword */) {
                            return lookAhead(isParenthesizedArrowFunctionExpressionWorker);
                        }
                        if (token() === 38 /* EqualsGreaterThanToken */) {
                            return 1 /* True */;
                        }
                        return 0 /* False */;
                    }