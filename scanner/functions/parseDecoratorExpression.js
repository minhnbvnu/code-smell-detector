function parseDecoratorExpression() {
                        if (inAwaitContext() && token() === 133 /* AwaitKeyword */) {
                            const pos = getNodePos();
                            const awaitExpression = parseIdentifier(Diagnostics.Expression_expected);
                            nextToken();
                            const memberExpression = parseMemberExpressionRest(pos, awaitExpression, 
                            /*allowOptionalChain*/
                            true);
                            return parseCallExpressionRest(pos, memberExpression);
                        }
                        return parseLeftHandSideExpressionOrHigher();
                    }