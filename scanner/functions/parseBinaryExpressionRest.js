function parseBinaryExpressionRest(precedence, leftOperand, pos) {
                        while (true) {
                            reScanGreaterToken();
                            const newPrecedence = getBinaryOperatorPrecedence(token());
                            const consumeCurrentOperator = token() === 42 /* AsteriskAsteriskToken */ ? newPrecedence >= precedence : newPrecedence > precedence;
                            if (!consumeCurrentOperator) {
                                break;
                            }
                            if (token() === 101 /* InKeyword */ && inDisallowInContext()) {
                                break;
                            }
                            if (token() === 128 /* AsKeyword */ || token() === 150 /* SatisfiesKeyword */) {
                                if (scanner2.hasPrecedingLineBreak()) {
                                    break;
                                }
                                else {
                                    const keywordKind = token();
                                    nextToken();
                                    leftOperand = keywordKind === 150 /* SatisfiesKeyword */ ? makeSatisfiesExpression(leftOperand, parseType()) : makeAsExpression(leftOperand, parseType());
                                }
                            }
                            else {
                                leftOperand = makeBinaryExpression(leftOperand, parseTokenNode(), parseBinaryExpressionOrHigher(newPrecedence), pos);
                            }
                        }
                        return leftOperand;
                    }