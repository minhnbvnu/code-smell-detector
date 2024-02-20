function parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction) {
                        if (isYieldExpression2()) {
                            return parseYieldExpression();
                        }
                        const arrowExpression = tryParseParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction) || tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction);
                        if (arrowExpression) {
                            return arrowExpression;
                        }
                        const pos = getNodePos();
                        const expr = parseBinaryExpressionOrHigher(0 /* Lowest */);
                        if (expr.kind === 79 /* Identifier */ && token() === 38 /* EqualsGreaterThanToken */) {
                            return parseSimpleArrowFunctionExpression(pos, expr, allowReturnTypeInArrowFunction, 
                            /*asyncModifier*/
                            void 0);
                        }
                        if (isLeftHandSideExpression(expr) && isAssignmentOperator(reScanGreaterToken())) {
                            return makeBinaryExpression(expr, parseTokenNode(), parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction), pos);
                        }
                        return parseConditionalExpressionRest(expr, pos, allowReturnTypeInArrowFunction);
                    }