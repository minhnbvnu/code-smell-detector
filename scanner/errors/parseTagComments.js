function parseTagComments(indent2, initialMargin) {
                                const commentsPos2 = getNodePos();
                                let comments2 = [];
                                const parts2 = [];
                                let linkEnd2;
                                let state = 0 /* BeginningOfLine */;
                                let previousWhitespace = true;
                                let margin;
                                function pushComment(text) {
                                    if (!margin) {
                                        margin = indent2;
                                    }
                                    comments2.push(text);
                                    indent2 += text.length;
                                }
                                if (initialMargin !== void 0) {
                                    if (initialMargin !== "") {
                                        pushComment(initialMargin);
                                    }
                                    state = 1 /* SawAsterisk */;
                                }
                                let tok = token();
                                loop: while (true) {
                                    switch (tok) {
                                        case 4 /* NewLineTrivia */:
                                            state = 0 /* BeginningOfLine */;
                                            comments2.push(scanner2.getTokenText());
                                            indent2 = 0;
                                            break;
                                        case 59 /* AtToken */:
                                            if (state === 3 /* SavingBackticks */ || state === 2 /* SavingComments */ && (!previousWhitespace || lookAhead(isNextJSDocTokenWhitespace))) {
                                                comments2.push(scanner2.getTokenText());
                                                break;
                                            }
                                            scanner2.setTextPos(scanner2.getTextPos() - 1);
                                        case 1 /* EndOfFileToken */:
                                            break loop;
                                        case 5 /* WhitespaceTrivia */:
                                            if (state === 2 /* SavingComments */ || state === 3 /* SavingBackticks */) {
                                                pushComment(scanner2.getTokenText());
                                            }
                                            else {
                                                const whitespace = scanner2.getTokenText();
                                                if (margin !== void 0 && indent2 + whitespace.length > margin) {
                                                    comments2.push(whitespace.slice(margin - indent2));
                                                }
                                                indent2 += whitespace.length;
                                            }
                                            break;
                                        case 18 /* OpenBraceToken */:
                                            state = 2 /* SavingComments */;
                                            const commentEnd = scanner2.getStartPos();
                                            const linkStart = scanner2.getTextPos() - 1;
                                            const link = parseJSDocLink(linkStart);
                                            if (link) {
                                                parts2.push(finishNode(factory2.createJSDocText(comments2.join("")), linkEnd2 != null ? linkEnd2 : commentsPos2, commentEnd));
                                                parts2.push(link);
                                                comments2 = [];
                                                linkEnd2 = scanner2.getTextPos();
                                            }
                                            else {
                                                pushComment(scanner2.getTokenText());
                                            }
                                            break;
                                        case 61 /* BacktickToken */:
                                            if (state === 3 /* SavingBackticks */) {
                                                state = 2 /* SavingComments */;
                                            }
                                            else {
                                                state = 3 /* SavingBackticks */;
                                            }
                                            pushComment(scanner2.getTokenText());
                                            break;
                                        case 41 /* AsteriskToken */:
                                            if (state === 0 /* BeginningOfLine */) {
                                                state = 1 /* SawAsterisk */;
                                                indent2 += 1;
                                                break;
                                            }
                                        default:
                                            if (state !== 3 /* SavingBackticks */) {
                                                state = 2 /* SavingComments */;
                                            }
                                            pushComment(scanner2.getTokenText());
                                            break;
                                    }
                                    previousWhitespace = token() === 5 /* WhitespaceTrivia */;
                                    tok = nextTokenJSDoc();
                                }
                                removeLeadingNewlines(comments2);
                                removeTrailingWhitespace(comments2);
                                if (parts2.length) {
                                    if (comments2.length) {
                                        parts2.push(finishNode(factory2.createJSDocText(comments2.join("")), linkEnd2 != null ? linkEnd2 : commentsPos2));
                                    }
                                    return createNodeArray(parts2, commentsPos2, scanner2.getTextPos());
                                }
                                else if (comments2.length) {
                                    return comments2.join("");
                                }
                            }