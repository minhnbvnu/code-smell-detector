function isParenthesizedArrowFunctionExpressionWorker() {
                        if (token() === 132 /* AsyncKeyword */) {
                            nextToken();
                            if (scanner2.hasPrecedingLineBreak()) {
                                return 0 /* False */;
                            }
                            if (token() !== 20 /* OpenParenToken */ && token() !== 29 /* LessThanToken */) {
                                return 0 /* False */;
                            }
                        }
                        const first2 = token();
                        const second = nextToken();
                        if (first2 === 20 /* OpenParenToken */) {
                            if (second === 21 /* CloseParenToken */) {
                                const third = nextToken();
                                switch (third) {
                                    case 38 /* EqualsGreaterThanToken */:
                                    case 58 /* ColonToken */:
                                    case 18 /* OpenBraceToken */:
                                        return 1 /* True */;
                                    default:
                                        return 0 /* False */;
                                }
                            }
                            if (second === 22 /* OpenBracketToken */ || second === 18 /* OpenBraceToken */) {
                                return 2 /* Unknown */;
                            }
                            if (second === 25 /* DotDotDotToken */) {
                                return 1 /* True */;
                            }
                            if (isModifierKind(second) && second !== 132 /* AsyncKeyword */ && lookAhead(nextTokenIsIdentifier)) {
                                if (nextToken() === 128 /* AsKeyword */) {
                                    return 0 /* False */;
                                }
                                return 1 /* True */;
                            }
                            if (!isIdentifier2() && second !== 108 /* ThisKeyword */) {
                                return 0 /* False */;
                            }
                            switch (nextToken()) {
                                case 58 /* ColonToken */:
                                    return 1 /* True */;
                                case 57 /* QuestionToken */:
                                    nextToken();
                                    if (token() === 58 /* ColonToken */ || token() === 27 /* CommaToken */ || token() === 63 /* EqualsToken */ || token() === 21 /* CloseParenToken */) {
                                        return 1 /* True */;
                                    }
                                    return 0 /* False */;
                                case 27 /* CommaToken */:
                                case 63 /* EqualsToken */:
                                case 21 /* CloseParenToken */:
                                    return 2 /* Unknown */;
                            }
                            return 0 /* False */;
                        }
                        else {
                            Debug.assert(first2 === 29 /* LessThanToken */);
                            if (!isIdentifier2() && token() !== 85 /* ConstKeyword */) {
                                return 0 /* False */;
                            }
                            if (languageVariant === 1 /* JSX */) {
                                const isArrowFunctionInJsx = lookAhead(() => {
                                    parseOptional(85 /* ConstKeyword */);
                                    const third = nextToken();
                                    if (third === 94 /* ExtendsKeyword */) {
                                        const fourth = nextToken();
                                        switch (fourth) {
                                            case 63 /* EqualsToken */:
                                            case 31 /* GreaterThanToken */:
                                            case 43 /* SlashToken */:
                                                return false;
                                            default:
                                                return true;
                                        }
                                    }
                                    else if (third === 27 /* CommaToken */ || third === 63 /* EqualsToken */) {
                                        return true;
                                    }
                                    return false;
                                });
                                if (isArrowFunctionInJsx) {
                                    return 1 /* True */;
                                }
                                return 0 /* False */;
                            }
                            return 2 /* Unknown */;
                        }
                    }