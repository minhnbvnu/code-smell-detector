function getPossibleTypeArgumentsInfo(tokenIn, sourceFile) {
            if (sourceFile.text.lastIndexOf("<", tokenIn ? tokenIn.pos : sourceFile.text.length) === -1) {
                return void 0;
            }
            let token = tokenIn;
            let remainingLessThanTokens = 0;
            let nTypeArguments = 0;
            while (token) {
                switch (token.kind) {
                    case 29 /* LessThanToken */:
                        token = findPrecedingToken(token.getFullStart(), sourceFile);
                        if (token && token.kind === 28 /* QuestionDotToken */) {
                            token = findPrecedingToken(token.getFullStart(), sourceFile);
                        }
                        if (!token || !isIdentifier(token))
                            return void 0;
                        if (!remainingLessThanTokens) {
                            return isDeclarationName(token) ? void 0 : { called: token, nTypeArguments };
                        }
                        remainingLessThanTokens--;
                        break;
                    case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                        remainingLessThanTokens = 3;
                        break;
                    case 48 /* GreaterThanGreaterThanToken */:
                        remainingLessThanTokens = 2;
                        break;
                    case 31 /* GreaterThanToken */:
                        remainingLessThanTokens++;
                        break;
                    case 19 /* CloseBraceToken */:
                        token = findPrecedingMatchingToken(token, 18 /* OpenBraceToken */, sourceFile);
                        if (!token)
                            return void 0;
                        break;
                    case 21 /* CloseParenToken */:
                        token = findPrecedingMatchingToken(token, 20 /* OpenParenToken */, sourceFile);
                        if (!token)
                            return void 0;
                        break;
                    case 23 /* CloseBracketToken */:
                        token = findPrecedingMatchingToken(token, 22 /* OpenBracketToken */, sourceFile);
                        if (!token)
                            return void 0;
                        break;
                    case 27 /* CommaToken */:
                        nTypeArguments++;
                        break;
                    case 38 /* EqualsGreaterThanToken */:
                    case 79 /* Identifier */:
                    case 10 /* StringLiteral */:
                    case 8 /* NumericLiteral */:
                    case 9 /* BigIntLiteral */:
                    case 110 /* TrueKeyword */:
                    case 95 /* FalseKeyword */:
                    case 112 /* TypeOfKeyword */:
                    case 94 /* ExtendsKeyword */:
                    case 141 /* KeyOfKeyword */:
                    case 24 /* DotToken */:
                    case 51 /* BarToken */:
                    case 57 /* QuestionToken */:
                    case 58 /* ColonToken */:
                        break;
                    default:
                        if (isTypeNode(token)) {
                            break;
                        }
                        return void 0;
                }
                token = findPrecedingToken(token.getFullStart(), sourceFile);
            }
            return void 0;
        }