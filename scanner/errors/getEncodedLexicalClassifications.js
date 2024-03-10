                function handleToken() {
                    switch (token) {
                        case 43 /* SlashToken */:
                        case 68 /* SlashEqualsToken */:
                            if (!noRegexTable[lastNonTriviaToken] && scanner2.reScanSlashToken() === 13 /* RegularExpressionLiteral */) {
                                token = 13 /* RegularExpressionLiteral */;
                            }
                            break;
                        case 29 /* LessThanToken */:
                            if (lastNonTriviaToken === 79 /* Identifier */) {
                                angleBracketStack++;
                            }
                            break;
                        case 31 /* GreaterThanToken */:
                            if (angleBracketStack > 0) {
                                angleBracketStack--;
                            }
                            break;
                        case 131 /* AnyKeyword */:
                        case 152 /* StringKeyword */:
                        case 148 /* NumberKeyword */:
                        case 134 /* BooleanKeyword */:
                        case 153 /* SymbolKeyword */:
                            if (angleBracketStack > 0 && !syntacticClassifierAbsent) {
                                token = 79 /* Identifier */;
                            }
                            break;
                        case 15 /* TemplateHead */:
                            templateStack.push(token);
                            break;
                        case 18 /* OpenBraceToken */:
                            if (templateStack.length > 0) {
                                templateStack.push(token);
                            }
                            break;
                        case 19 /* CloseBraceToken */:
                            if (templateStack.length > 0) {
                                const lastTemplateStackToken = lastOrUndefined(templateStack);
                                if (lastTemplateStackToken === 15 /* TemplateHead */) {
                                    token = scanner2.reScanTemplateToken(
                                    /* isTaggedTemplate */
                                    false);
                                    if (token === 17 /* TemplateTail */) {
                                        templateStack.pop();
                                    }
                                    else {
                                        Debug.assertEqual(token, 16 /* TemplateMiddle */, "Should have been a template middle.");
                                    }
                                }
                                else {
                                    Debug.assertEqual(lastTemplateStackToken, 18 /* OpenBraceToken */, "Should have been an open brace");
                                    templateStack.pop();
                                }
                            }
                            break;
                        default:
                            if (!isKeyword(token)) {
                                break;
                            }
                            if (lastNonTriviaToken === 24 /* DotToken */) {
                                token = 79 /* Identifier */;
                            }
                            else if (isKeyword(lastNonTriviaToken) && isKeyword(token) && !canFollow(lastNonTriviaToken, token)) {
                                token = 79 /* Identifier */;
                            }
                    }
                }