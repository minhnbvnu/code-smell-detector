function parseForOrForInOrForOfStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(97 /* ForKeyword */);
                        const awaitToken = parseOptionalToken(133 /* AwaitKeyword */);
                        parseExpected(20 /* OpenParenToken */);
                        let initializer;
                        if (token() !== 26 /* SemicolonToken */) {
                            if (token() === 113 /* VarKeyword */ || token() === 119 /* LetKeyword */ || token() === 85 /* ConstKeyword */) {
                                initializer = parseVariableDeclarationList(
                                /*inForStatementInitializer*/
                                true);
                            }
                            else {
                                initializer = disallowInAnd(parseExpression);
                            }
                        }
                        let node;
                        if (awaitToken ? parseExpected(162 /* OfKeyword */) : parseOptional(162 /* OfKeyword */)) {
                            const expression = allowInAnd(() => parseAssignmentExpressionOrHigher(
                            /*allowReturnTypeInArrowFunction*/
                            true));
                            parseExpected(21 /* CloseParenToken */);
                            node = factoryCreateForOfStatement(awaitToken, initializer, expression, parseStatement());
                        }
                        else if (parseOptional(101 /* InKeyword */)) {
                            const expression = allowInAnd(parseExpression);
                            parseExpected(21 /* CloseParenToken */);
                            node = factory2.createForInStatement(initializer, expression, parseStatement());
                        }
                        else {
                            parseExpected(26 /* SemicolonToken */);
                            const condition = token() !== 26 /* SemicolonToken */ && token() !== 21 /* CloseParenToken */ ? allowInAnd(parseExpression) : void 0;
                            parseExpected(26 /* SemicolonToken */);
                            const incrementor = token() !== 21 /* CloseParenToken */ ? allowInAnd(parseExpression) : void 0;
                            parseExpected(21 /* CloseParenToken */);
                            node = factoryCreateForStatement(initializer, condition, incrementor, parseStatement());
                        }
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }