function parseJsxChild(openingTag, token2) {
                        switch (token2) {
                            case 1 /* EndOfFileToken */:
                                if (isJsxOpeningFragment(openingTag)) {
                                    parseErrorAtRange(openingTag, Diagnostics.JSX_fragment_has_no_corresponding_closing_tag);
                                }
                                else {
                                    const tag = openingTag.tagName;
                                    const start = skipTrivia(sourceText, tag.pos);
                                    parseErrorAt(start, tag.end, Diagnostics.JSX_element_0_has_no_corresponding_closing_tag, getTextOfNodeFromSourceText(sourceText, openingTag.tagName));
                                }
                                return void 0;
                            case 30 /* LessThanSlashToken */:
                            case 7 /* ConflictMarkerTrivia */:
                                return void 0;
                            case 11 /* JsxText */:
                            case 12 /* JsxTextAllWhiteSpaces */:
                                return parseJsxText();
                            case 18 /* OpenBraceToken */:
                                return parseJsxExpression(
                                /*inExpressionContext*/
                                false);
                            case 29 /* LessThanToken */:
                                return parseJsxElementOrSelfClosingElementOrFragment(
                                /*inExpressionContext*/
                                false, 
                                /*topInvalidNodePosition*/
                                void 0, openingTag);
                            default:
                                return Debug.assertNever(token2);
                        }
                    }