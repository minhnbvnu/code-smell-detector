function parseJsonText2(fileName2, sourceText2, languageVersion2 = 2 /* ES2015 */, syntaxCursor2, setParentNodes = false) {
                        initializeState(fileName2, sourceText2, languageVersion2, syntaxCursor2, 6 /* JSON */);
                        sourceFlags = contextFlags;
                        nextToken();
                        const pos = getNodePos();
                        let statements, endOfFileToken;
                        if (token() === 1 /* EndOfFileToken */) {
                            statements = createNodeArray([], pos, pos);
                            endOfFileToken = parseTokenNode();
                        }
                        else {
                            let expressions;
                            while (token() !== 1 /* EndOfFileToken */) {
                                let expression2;
                                switch (token()) {
                                    case 22 /* OpenBracketToken */:
                                        expression2 = parseArrayLiteralExpression();
                                        break;
                                    case 110 /* TrueKeyword */:
                                    case 95 /* FalseKeyword */:
                                    case 104 /* NullKeyword */:
                                        expression2 = parseTokenNode();
                                        break;
                                    case 40 /* MinusToken */:
                                        if (lookAhead(() => nextToken() === 8 /* NumericLiteral */ && nextToken() !== 58 /* ColonToken */)) {
                                            expression2 = parsePrefixUnaryExpression();
                                        }
                                        else {
                                            expression2 = parseObjectLiteralExpression();
                                        }
                                        break;
                                    case 8 /* NumericLiteral */:
                                    case 10 /* StringLiteral */:
                                        if (lookAhead(() => nextToken() !== 58 /* ColonToken */)) {
                                            expression2 = parseLiteralNode();
                                            break;
                                        }
                                    default:
                                        expression2 = parseObjectLiteralExpression();
                                        break;
                                }
                                if (expressions && isArray(expressions)) {
                                    expressions.push(expression2);
                                }
                                else if (expressions) {
                                    expressions = [expressions, expression2];
                                }
                                else {
                                    expressions = expression2;
                                    if (token() !== 1 /* EndOfFileToken */) {
                                        parseErrorAtCurrentToken(Diagnostics.Unexpected_token);
                                    }
                                }
                            }
                            const expression = isArray(expressions) ? finishNode(factoryCreateArrayLiteralExpression(expressions), pos) : Debug.checkDefined(expressions);
                            const statement = factoryCreateExpressionStatement(expression);
                            finishNode(statement, pos);
                            statements = createNodeArray([statement], pos);
                            endOfFileToken = parseExpectedToken(1 /* EndOfFileToken */, Diagnostics.Unexpected_token);
                        }
                        const sourceFile = createSourceFile2(fileName2, 2 /* ES2015 */, 6 /* JSON */, 
                        /*isDeclaration*/
                        false, statements, endOfFileToken, sourceFlags, noop);
                        if (setParentNodes) {
                            fixupParentReferences(sourceFile);
                        }
                        sourceFile.nodeCount = nodeCount;
                        sourceFile.identifierCount = identifierCount;
                        sourceFile.identifiers = identifiers;
                        sourceFile.parseDiagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
                        if (jsDocDiagnostics) {
                            sourceFile.jsDocDiagnostics = attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
                        }
                        const result = sourceFile;
                        clearState();
                        return result;
                    }