                            return scanner2.scanRange(start + 3, length2 - 5, () => {
                                let state = 1 /* SawAsterisk */;
                                let margin;
                                let indent2 = start - (content.lastIndexOf("\n", start) + 1) + 4;
                                function pushComment(text) {
                                    if (!margin) {
                                        margin = indent2;
                                    }
                                    comments.push(text);
                                    indent2 += text.length;
                                }
                                nextTokenJSDoc();
                                while (parseOptionalJsdoc(5 /* WhitespaceTrivia */))
                                    ;
                                if (parseOptionalJsdoc(4 /* NewLineTrivia */)) {
                                    state = 0 /* BeginningOfLine */;
                                    indent2 = 0;
                                }
                                loop: while (true) {
                                    switch (token()) {
                                        case 59 /* AtToken */:
                                            if (state === 0 /* BeginningOfLine */ || state === 1 /* SawAsterisk */) {
                                                removeTrailingWhitespace(comments);
                                                if (!commentsPos)
                                                    commentsPos = getNodePos();
                                                addTag(parseTag(indent2));
                                                state = 0 /* BeginningOfLine */;
                                                margin = void 0;
                                            }
                                            else {
                                                pushComment(scanner2.getTokenText());
                                            }
                                            break;
                                        case 4 /* NewLineTrivia */:
                                            comments.push(scanner2.getTokenText());
                                            state = 0 /* BeginningOfLine */;
                                            indent2 = 0;
                                            break;
                                        case 41 /* AsteriskToken */:
                                            const asterisk = scanner2.getTokenText();
                                            if (state === 1 /* SawAsterisk */ || state === 2 /* SavingComments */) {
                                                state = 2 /* SavingComments */;
                                                pushComment(asterisk);
                                            }
                                            else {
                                                state = 1 /* SawAsterisk */;
                                                indent2 += asterisk.length;
                                            }
                                            break;
                                        case 5 /* WhitespaceTrivia */:
                                            const whitespace = scanner2.getTokenText();
                                            if (state === 2 /* SavingComments */) {
                                                comments.push(whitespace);
                                            }
                                            else if (margin !== void 0 && indent2 + whitespace.length > margin) {
                                                comments.push(whitespace.slice(margin - indent2));
                                            }
                                            indent2 += whitespace.length;
                                            break;
                                        case 1 /* EndOfFileToken */:
                                            break loop;
                                        case 18 /* OpenBraceToken */:
                                            state = 2 /* SavingComments */;
                                            const commentEnd = scanner2.getStartPos();
                                            const linkStart = scanner2.getTextPos() - 1;
                                            const link = parseJSDocLink(linkStart);
                                            if (link) {
                                                if (!linkEnd) {
                                                    removeLeadingNewlines(comments);
                                                }
                                                parts.push(finishNode(factory2.createJSDocText(comments.join("")), linkEnd != null ? linkEnd : start, commentEnd));
                                                parts.push(link);
                                                comments = [];
                                                linkEnd = scanner2.getTextPos();
                                                break;
                                            }
                                        default:
                                            state = 2 /* SavingComments */;
                                            pushComment(scanner2.getTokenText());
                                            break;
                                    }
                                    nextTokenJSDoc();
                                }
                                removeTrailingWhitespace(comments);
                                if (parts.length && comments.length) {
                                    parts.push(finishNode(factory2.createJSDocText(comments.join("")), linkEnd != null ? linkEnd : start, commentsPos));
                                }
                                if (parts.length && tags)
                                    Debug.assertIsDefined(commentsPos, "having parsed tags implies that the end of the comment span should be set");
                                const tagsArray = tags && createNodeArray(tags, tagsPos, tagsEnd);
                                return finishNode(factory2.createJSDocComment(parts.length ? createNodeArray(parts, start, commentsPos) : comments.length ? comments.join("") : void 0, tagsArray), start, end);
                            });
                            function parseTag(margin) {
                                Debug.assert(token() === 59 /* AtToken */);
                                const start2 = scanner2.getTokenPos();
                                nextTokenJSDoc();
                                const tagName = parseJSDocIdentifierName(
                                /*message*/
                                void 0);
                                const indentText = skipWhitespaceOrAsterisk();
                                let tag;
                                switch (tagName.escapedText) {
                                    case "author":
                                        tag = parseAuthorTag(start2, tagName, margin, indentText);
                                        break;
                                    case "implements":
                                        tag = parseImplementsTag(start2, tagName, margin, indentText);
                                        break;
                                    case "augments":
                                    case "extends":
                                        tag = parseAugmentsTag(start2, tagName, margin, indentText);
                                        break;
                                    case "class":
                                    case "constructor":
                                        tag = parseSimpleTag(start2, factory2.createJSDocClassTag, tagName, margin, indentText);
                                        break;
                                    case "public":
                                        tag = parseSimpleTag(start2, factory2.createJSDocPublicTag, tagName, margin, indentText);
                                        break;
                                    case "private":
                                        tag = parseSimpleTag(start2, factory2.createJSDocPrivateTag, tagName, margin, indentText);
                                        break;
                                    case "protected":
                                        tag = parseSimpleTag(start2, factory2.createJSDocProtectedTag, tagName, margin, indentText);
                                        break;
                                    case "readonly":
                                        tag = parseSimpleTag(start2, factory2.createJSDocReadonlyTag, tagName, margin, indentText);
                                        break;
                                    case "override":
                                        tag = parseSimpleTag(start2, factory2.createJSDocOverrideTag, tagName, margin, indentText);
                                        break;
                                    case "deprecated":
                                        hasDeprecatedTag = true;
                                        tag = parseSimpleTag(start2, factory2.createJSDocDeprecatedTag, tagName, margin, indentText);
                                        break;
                                    case "this":
                                        tag = parseThisTag(start2, tagName, margin, indentText);
                                        break;
                                    case "enum":
                                        tag = parseEnumTag(start2, tagName, margin, indentText);
                                        break;
                                    case "arg":
                                    case "argument":
                                    case "param":
                                        return parseParameterOrPropertyTag(start2, tagName, 2 /* Parameter */, margin);
                                    case "return":
                                    case "returns":
                                        tag = parseReturnTag(start2, tagName, margin, indentText);
                                        break;
                                    case "template":
                                        tag = parseTemplateTag(start2, tagName, margin, indentText);
                                        break;
                                    case "type":
                                        tag = parseTypeTag(start2, tagName, margin, indentText);
                                        break;
                                    case "typedef":
                                        tag = parseTypedefTag(start2, tagName, margin, indentText);
                                        break;
                                    case "callback":
                                        tag = parseCallbackTag(start2, tagName, margin, indentText);
                                        break;
                                    case "overload":
                                        tag = parseOverloadTag(start2, tagName, margin, indentText);
                                        break;
                                    case "satisfies":
                                        tag = parseSatisfiesTag(start2, tagName, margin, indentText);
                                        break;
                                    case "see":
                                        tag = parseSeeTag(start2, tagName, margin, indentText);
                                        break;
                                    case "exception":
                                    case "throws":
                                        tag = parseThrowsTag(start2, tagName, margin, indentText);
                                        break;
                                    default:
                                        tag = parseUnknownTag(start2, tagName, margin, indentText);
                                        break;
                                }
                                return tag;
                            }
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