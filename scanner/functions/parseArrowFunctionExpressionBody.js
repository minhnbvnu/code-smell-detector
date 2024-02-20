function parseArrowFunctionExpressionBody(isAsync, allowReturnTypeInArrowFunction) {
                        if (token() === 18 /* OpenBraceToken */) {
                            return parseFunctionBlock(isAsync ? 2 /* Await */ : 0 /* None */);
                        }
                        if (token() !== 26 /* SemicolonToken */ && token() !== 98 /* FunctionKeyword */ && token() !== 84 /* ClassKeyword */ && isStartOfStatement() && !isStartOfExpressionStatement()) {
                            return parseFunctionBlock(16 /* IgnoreMissingOpenBrace */ | (isAsync ? 2 /* Await */ : 0 /* None */));
                        }
                        const savedTopLevel = topLevel;
                        topLevel = false;
                        const node = isAsync ? doInAwaitContext(() => parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction)) : doOutsideOfAwaitContext(() => parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction));
                        topLevel = savedTopLevel;
                        return node;
                    }