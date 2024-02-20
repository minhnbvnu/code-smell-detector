function tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction) {
                        if (token() === 132 /* AsyncKeyword */) {
                            if (lookAhead(isUnParenthesizedAsyncArrowFunctionWorker) === 1 /* True */) {
                                const pos = getNodePos();
                                const asyncModifier = parseModifiersForArrowFunction();
                                const expr = parseBinaryExpressionOrHigher(0 /* Lowest */);
                                return parseSimpleArrowFunctionExpression(pos, expr, allowReturnTypeInArrowFunction, asyncModifier);
                            }
                        }
                        return void 0;
                    }