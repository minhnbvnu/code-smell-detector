function getNewEndOfLineState(scanner2, token, lastOnTemplateStack) {
            switch (token) {
                case 10 /* StringLiteral */: {
                    if (!scanner2.isUnterminated())
                        return void 0;
                    const tokenText = scanner2.getTokenText();
                    const lastCharIndex = tokenText.length - 1;
                    let numBackslashes = 0;
                    while (tokenText.charCodeAt(lastCharIndex - numBackslashes) === 92 /* backslash */) {
                        numBackslashes++;
                    }
                    if ((numBackslashes & 1) === 0)
                        return void 0;
                    return tokenText.charCodeAt(0) === 34 /* doubleQuote */ ? 3 /* InDoubleQuoteStringLiteral */ : 2 /* InSingleQuoteStringLiteral */;
                }
                case 3 /* MultiLineCommentTrivia */:
                    return scanner2.isUnterminated() ? 1 /* InMultiLineCommentTrivia */ : void 0;
                default:
                    if (isTemplateLiteralKind(token)) {
                        if (!scanner2.isUnterminated()) {
                            return void 0;
                        }
                        switch (token) {
                            case 17 /* TemplateTail */:
                                return 5 /* InTemplateMiddleOrTail */;
                            case 14 /* NoSubstitutionTemplateLiteral */:
                                return 4 /* InTemplateHeadOrNoSubstitutionTemplate */;
                            default:
                                return Debug.fail("Only 'NoSubstitutionTemplateLiteral's and 'TemplateTail's can be unterminated; got SyntaxKind #" + token);
                        }
                    }
                    return lastOnTemplateStack === 15 /* TemplateHead */ ? 6 /* InTemplateSubstitutionPosition */ : void 0;
            }
        }