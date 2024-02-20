function parseUpdateExpression() {
                        if (token() === 45 /* PlusPlusToken */ || token() === 46 /* MinusMinusToken */) {
                            const pos = getNodePos();
                            return finishNode(factory2.createPrefixUnaryExpression(token(), nextTokenAnd(parseLeftHandSideExpressionOrHigher)), pos);
                        }
                        else if (languageVariant === 1 /* JSX */ && token() === 29 /* LessThanToken */ && lookAhead(nextTokenIsIdentifierOrKeywordOrGreaterThan)) {
                            return parseJsxElementOrSelfClosingElementOrFragment(
                            /*inExpressionContext*/
                            true);
                        }
                        const expression = parseLeftHandSideExpressionOrHigher();
                        Debug.assert(isLeftHandSideExpression(expression));
                        if ((token() === 45 /* PlusPlusToken */ || token() === 46 /* MinusMinusToken */) && !scanner2.hasPrecedingLineBreak()) {
                            const operator = token();
                            nextToken();
                            return finishNode(factory2.createPostfixUnaryExpression(expression, operator), expression.pos);
                        }
                        return expression;
                    }