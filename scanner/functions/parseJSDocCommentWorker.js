function parseJSDocCommentWorker(start = 0, length2) {
                            const content = sourceText;
                            const end = length2 === void 0 ? content.length : start + length2;
                            length2 = end - start;
                            Debug.assert(start >= 0);
                            Debug.assert(start <= end);
                            Debug.assert(end <= content.length);
                            if (!isJSDocLikeText(content, start)) {
                                return void 0;
                            }
                            let tags;
                            let tagsPos;
                            let tagsEnd;
                            let linkEnd;
                            let commentsPos;
                            let comments = [];
                            const parts = [];
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
                            function removeLeadingNewlines(comments2) {
                                while (comments2.length && (comments2[0] === "\n" || comments2[0] === "\r")) {
                                    comments2.shift();
                                }
                            }
                            function removeTrailingWhitespace(comments2) {
                                while (comments2.length && comments2[comments2.length - 1].trim() === "") {
                                    comments2.pop();
                                }
                            }
                            function isNextNonwhitespaceTokenEndOfFile() {
                                while (true) {
                                    nextTokenJSDoc();
                                    if (token() === 1 /* EndOfFileToken */) {
                                        return true;
                                    }
                                    if (!(token() === 5 /* WhitespaceTrivia */ || token() === 4 /* NewLineTrivia */)) {
                                        return false;
                                    }
                                }
                            }
                            function skipWhitespace() {
                                if (token() === 5 /* WhitespaceTrivia */ || token() === 4 /* NewLineTrivia */) {
                                    if (lookAhead(isNextNonwhitespaceTokenEndOfFile)) {
                                        return;
                                    }
                                }
                                while (token() === 5 /* WhitespaceTrivia */ || token() === 4 /* NewLineTrivia */) {
                                    nextTokenJSDoc();
                                }
                            }
                            function skipWhitespaceOrAsterisk() {
                                if (token() === 5 /* WhitespaceTrivia */ || token() === 4 /* NewLineTrivia */) {
                                    if (lookAhead(isNextNonwhitespaceTokenEndOfFile)) {
                                        return "";
                                    }
                                }
                                let precedingLineBreak = scanner2.hasPrecedingLineBreak();
                                let seenLineBreak = false;
                                let indentText = "";
                                while (precedingLineBreak && token() === 41 /* AsteriskToken */ || token() === 5 /* WhitespaceTrivia */ || token() === 4 /* NewLineTrivia */) {
                                    indentText += scanner2.getTokenText();
                                    if (token() === 4 /* NewLineTrivia */) {
                                        precedingLineBreak = true;
                                        seenLineBreak = true;
                                        indentText = "";
                                    }
                                    else if (token() === 41 /* AsteriskToken */) {
                                        precedingLineBreak = false;
                                    }
                                    nextTokenJSDoc();
                                }
                                return seenLineBreak ? indentText : "";
                            }
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
                            function parseTrailingTagComments(pos, end2, margin, indentText) {
                                if (!indentText) {
                                    margin += end2 - pos;
                                }
                                return parseTagComments(margin, indentText.slice(margin));
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
                            function isNextJSDocTokenWhitespace() {
                                const next = nextTokenJSDoc();
                                return next === 5 /* WhitespaceTrivia */ || next === 4 /* NewLineTrivia */;
                            }
                            function parseJSDocLink(start2) {
                                const linkType = tryParse(parseJSDocLinkPrefix);
                                if (!linkType) {
                                    return void 0;
                                }
                                nextTokenJSDoc();
                                skipWhitespace();
                                const p2 = getNodePos();
                                let name = tokenIsIdentifierOrKeyword(token()) ? parseEntityName(
                                /*allowReservedWords*/
                                true) : void 0;
                                if (name) {
                                    while (token() === 80 /* PrivateIdentifier */) {
                                        reScanHashToken();
                                        nextTokenJSDoc();
                                        name = finishNode(factory2.createJSDocMemberName(name, parseIdentifier()), p2);
                                    }
                                }
                                const text = [];
                                while (token() !== 19 /* CloseBraceToken */ && token() !== 4 /* NewLineTrivia */ && token() !== 1 /* EndOfFileToken */) {
                                    text.push(scanner2.getTokenText());
                                    nextTokenJSDoc();
                                }
                                const create = linkType === "link" ? factory2.createJSDocLink : linkType === "linkcode" ? factory2.createJSDocLinkCode : factory2.createJSDocLinkPlain;
                                return finishNode(create(name, text.join("")), start2, scanner2.getTextPos());
                            }
                            function parseJSDocLinkPrefix() {
                                skipWhitespaceOrAsterisk();
                                if (token() === 18 /* OpenBraceToken */ && nextTokenJSDoc() === 59 /* AtToken */ && tokenIsIdentifierOrKeyword(nextTokenJSDoc())) {
                                    const kind = scanner2.getTokenValue();
                                    if (isJSDocLinkTag(kind))
                                        return kind;
                                }
                            }
                            function isJSDocLinkTag(kind) {
                                return kind === "link" || kind === "linkcode" || kind === "linkplain";
                            }
                            function parseUnknownTag(start2, tagName, indent2, indentText) {
                                return finishNode(factory2.createJSDocUnknownTag(tagName, parseTrailingTagComments(start2, getNodePos(), indent2, indentText)), start2);
                            }
                            function addTag(tag) {
                                if (!tag) {
                                    return;
                                }
                                if (!tags) {
                                    tags = [tag];
                                    tagsPos = tag.pos;
                                }
                                else {
                                    tags.push(tag);
                                }
                                tagsEnd = tag.end;
                            }
                            function tryParseTypeExpression() {
                                skipWhitespaceOrAsterisk();
                                return token() === 18 /* OpenBraceToken */ ? parseJSDocTypeExpression() : void 0;
                            }
                            function parseBracketNameInPropertyAndParamTag() {
                                const isBracketed = parseOptionalJsdoc(22 /* OpenBracketToken */);
                                if (isBracketed) {
                                    skipWhitespace();
                                }
                                const isBackquoted = parseOptionalJsdoc(61 /* BacktickToken */);
                                const name = parseJSDocEntityName();
                                if (isBackquoted) {
                                    parseExpectedTokenJSDoc(61 /* BacktickToken */);
                                }
                                if (isBracketed) {
                                    skipWhitespace();
                                    if (parseOptionalToken(63 /* EqualsToken */)) {
                                        parseExpression();
                                    }
                                    parseExpected(23 /* CloseBracketToken */);
                                }
                                return { name, isBracketed };
                            }
                            function isObjectOrObjectArrayTypeReference(node) {
                                switch (node.kind) {
                                    case 149 /* ObjectKeyword */:
                                        return true;
                                    case 185 /* ArrayType */:
                                        return isObjectOrObjectArrayTypeReference(node.elementType);
                                    default:
                                        return isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "Object" && !node.typeArguments;
                                }
                            }
                            function parseParameterOrPropertyTag(start2, tagName, target, indent2) {
                                let typeExpression = tryParseTypeExpression();
                                let isNameFirst = !typeExpression;
                                skipWhitespaceOrAsterisk();
                                const { name, isBracketed } = parseBracketNameInPropertyAndParamTag();
                                const indentText = skipWhitespaceOrAsterisk();
                                if (isNameFirst && !lookAhead(parseJSDocLinkPrefix)) {
                                    typeExpression = tryParseTypeExpression();
                                }
                                const comment = parseTrailingTagComments(start2, getNodePos(), indent2, indentText);
                                const nestedTypeLiteral = target !== 4 /* CallbackParameter */ && parseNestedTypeLiteral(typeExpression, name, target, indent2);
                                if (nestedTypeLiteral) {
                                    typeExpression = nestedTypeLiteral;
                                    isNameFirst = true;
                                }
                                const result = target === 1 /* Property */ ? factory2.createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment) : factory2.createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment);
                                return finishNode(result, start2);
                            }
                            function parseNestedTypeLiteral(typeExpression, name, target, indent2) {
                                if (typeExpression && isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                                    const pos = getNodePos();
                                    let child;
                                    let children;
                                    while (child = tryParse(() => parseChildParameterOrPropertyTag(target, indent2, name))) {
                                        if (child.kind === 344 /* JSDocParameterTag */ || child.kind === 351 /* JSDocPropertyTag */) {
                                            children = append(children, child);
                                        }
                                    }
                                    if (children) {
                                        const literal = finishNode(factory2.createJSDocTypeLiteral(children, typeExpression.type.kind === 185 /* ArrayType */), pos);
                                        return finishNode(factory2.createJSDocTypeExpression(literal), pos);
                                    }
                                }
                            }
                            function parseReturnTag(start2, tagName, indent2, indentText) {
                                if (some(tags, isJSDocReturnTag)) {
                                    parseErrorAt(tagName.pos, scanner2.getTokenPos(), Diagnostics._0_tag_already_specified, tagName.escapedText);
                                }
                                const typeExpression = tryParseTypeExpression();
                                return finishNode(factory2.createJSDocReturnTag(tagName, typeExpression, parseTrailingTagComments(start2, getNodePos(), indent2, indentText)), start2);
                            }
                            function parseTypeTag(start2, tagName, indent2, indentText) {
                                if (some(tags, isJSDocTypeTag)) {
                                    parseErrorAt(tagName.pos, scanner2.getTokenPos(), Diagnostics._0_tag_already_specified, tagName.escapedText);
                                }
                                const typeExpression = parseJSDocTypeExpression(
                                /*mayOmitBraces*/
                                true);
                                const comments2 = indent2 !== void 0 && indentText !== void 0 ? parseTrailingTagComments(start2, getNodePos(), indent2, indentText) : void 0;
                                return finishNode(factory2.createJSDocTypeTag(tagName, typeExpression, comments2), start2);
                            }
                            function parseSeeTag(start2, tagName, indent2, indentText) {
                                const isMarkdownOrJSDocLink = token() === 22 /* OpenBracketToken */ || lookAhead(() => nextTokenJSDoc() === 59 /* AtToken */ && tokenIsIdentifierOrKeyword(nextTokenJSDoc()) && isJSDocLinkTag(scanner2.getTokenValue()));
                                const nameExpression = isMarkdownOrJSDocLink ? void 0 : parseJSDocNameReference();
                                const comments2 = indent2 !== void 0 && indentText !== void 0 ? parseTrailingTagComments(start2, getNodePos(), indent2, indentText) : void 0;
                                return finishNode(factory2.createJSDocSeeTag(tagName, nameExpression, comments2), start2);
                            }
                            function parseThrowsTag(start2, tagName, indent2, indentText) {
                                const typeExpression = tryParseTypeExpression();
                                const comment = parseTrailingTagComments(start2, getNodePos(), indent2, indentText);
                                return finishNode(factory2.createJSDocThrowsTag(tagName, typeExpression, comment), start2);
                            }
                            function parseAuthorTag(start2, tagName, indent2, indentText) {
                                const commentStart = getNodePos();
                                const textOnly = parseAuthorNameAndEmail();
                                let commentEnd = scanner2.getStartPos();
                                const comments2 = parseTrailingTagComments(start2, commentEnd, indent2, indentText);
                                if (!comments2) {
                                    commentEnd = scanner2.getStartPos();
                                }
                                const allParts = typeof comments2 !== "string" ? createNodeArray(concatenate([finishNode(textOnly, commentStart, commentEnd)], comments2), commentStart) : textOnly.text + comments2;
                                return finishNode(factory2.createJSDocAuthorTag(tagName, allParts), start2);
                            }
                            function parseAuthorNameAndEmail() {
                                const comments2 = [];
                                let inEmail = false;
                                let token2 = scanner2.getToken();
                                while (token2 !== 1 /* EndOfFileToken */ && token2 !== 4 /* NewLineTrivia */) {
                                    if (token2 === 29 /* LessThanToken */) {
                                        inEmail = true;
                                    }
                                    else if (token2 === 59 /* AtToken */ && !inEmail) {
                                        break;
                                    }
                                    else if (token2 === 31 /* GreaterThanToken */ && inEmail) {
                                        comments2.push(scanner2.getTokenText());
                                        scanner2.setTextPos(scanner2.getTokenPos() + 1);
                                        break;
                                    }
                                    comments2.push(scanner2.getTokenText());
                                    token2 = nextTokenJSDoc();
                                }
                                return factory2.createJSDocText(comments2.join(""));
                            }
                            function parseImplementsTag(start2, tagName, margin, indentText) {
                                const className = parseExpressionWithTypeArgumentsForAugments();
                                return finishNode(factory2.createJSDocImplementsTag(tagName, className, parseTrailingTagComments(start2, getNodePos(), margin, indentText)), start2);
                            }
                            function parseAugmentsTag(start2, tagName, margin, indentText) {
                                const className = parseExpressionWithTypeArgumentsForAugments();
                                return finishNode(factory2.createJSDocAugmentsTag(tagName, className, parseTrailingTagComments(start2, getNodePos(), margin, indentText)), start2);
                            }
                            function parseSatisfiesTag(start2, tagName, margin, indentText) {
                                const typeExpression = parseJSDocTypeExpression(
                                /*mayOmitBraces*/
                                false);
                                const comments2 = margin !== void 0 && indentText !== void 0 ? parseTrailingTagComments(start2, getNodePos(), margin, indentText) : void 0;
                                return finishNode(factory2.createJSDocSatisfiesTag(tagName, typeExpression, comments2), start2);
                            }
                            function parseExpressionWithTypeArgumentsForAugments() {
                                const usedBrace = parseOptional(18 /* OpenBraceToken */);
                                const pos = getNodePos();
                                const expression = parsePropertyAccessEntityNameExpression();
                                const typeArguments = tryParseTypeArguments();
                                const node = factory2.createExpressionWithTypeArguments(expression, typeArguments);
                                const res = finishNode(node, pos);
                                if (usedBrace) {
                                    parseExpected(19 /* CloseBraceToken */);
                                }
                                return res;
                            }
                            function parsePropertyAccessEntityNameExpression() {
                                const pos = getNodePos();
                                let node = parseJSDocIdentifierName();
                                while (parseOptional(24 /* DotToken */)) {
                                    const name = parseJSDocIdentifierName();
                                    node = finishNode(factoryCreatePropertyAccessExpression(node, name), pos);
                                }
                                return node;
                            }
                            function parseSimpleTag(start2, createTag, tagName, margin, indentText) {
                                return finishNode(createTag(tagName, parseTrailingTagComments(start2, getNodePos(), margin, indentText)), start2);
                            }
                            function parseThisTag(start2, tagName, margin, indentText) {
                                const typeExpression = parseJSDocTypeExpression(
                                /*mayOmitBraces*/
                                true);
                                skipWhitespace();
                                return finishNode(factory2.createJSDocThisTag(tagName, typeExpression, parseTrailingTagComments(start2, getNodePos(), margin, indentText)), start2);
                            }
                            function parseEnumTag(start2, tagName, margin, indentText) {
                                const typeExpression = parseJSDocTypeExpression(
                                /*mayOmitBraces*/
                                true);
                                skipWhitespace();
                                return finishNode(factory2.createJSDocEnumTag(tagName, typeExpression, parseTrailingTagComments(start2, getNodePos(), margin, indentText)), start2);
                            }
                            function parseTypedefTag(start2, tagName, indent2, indentText) {
                                var _a2;
                                let typeExpression = tryParseTypeExpression();
                                skipWhitespaceOrAsterisk();
                                const fullName = parseJSDocTypeNameWithNamespace();
                                skipWhitespace();
                                let comment = parseTagComments(indent2);
                                let end2;
                                if (!typeExpression || isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                                    let child;
                                    let childTypeTag;
                                    let jsDocPropertyTags;
                                    let hasChildren = false;
                                    while (child = tryParse(() => parseChildPropertyTag(indent2))) {
                                        hasChildren = true;
                                        if (child.kind === 347 /* JSDocTypeTag */) {
                                            if (childTypeTag) {
                                                const lastError = parseErrorAtCurrentToken(Diagnostics.A_JSDoc_typedef_comment_may_not_contain_multiple_type_tags);
                                                if (lastError) {
                                                    addRelatedInfo(lastError, createDetachedDiagnostic(fileName, 0, 0, Diagnostics.The_tag_was_first_specified_here));
                                                }
                                                break;
                                            }
                                            else {
                                                childTypeTag = child;
                                            }
                                        }
                                        else {
                                            jsDocPropertyTags = append(jsDocPropertyTags, child);
                                        }
                                    }
                                    if (hasChildren) {
                                        const isArrayType = typeExpression && typeExpression.type.kind === 185 /* ArrayType */;
                                        const jsdocTypeLiteral = factory2.createJSDocTypeLiteral(jsDocPropertyTags, isArrayType);
                                        typeExpression = childTypeTag && childTypeTag.typeExpression && !isObjectOrObjectArrayTypeReference(childTypeTag.typeExpression.type) ? childTypeTag.typeExpression : finishNode(jsdocTypeLiteral, start2);
                                        end2 = typeExpression.end;
                                    }
                                }
                                end2 = end2 || comment !== void 0 ? getNodePos() : ((_a2 = fullName != null ? fullName : typeExpression) != null ? _a2 : tagName).end;
                                if (!comment) {
                                    comment = parseTrailingTagComments(start2, end2, indent2, indentText);
                                }
                                const typedefTag = factory2.createJSDocTypedefTag(tagName, typeExpression, fullName, comment);
                                return finishNode(typedefTag, start2, end2);
                            }
                            function parseJSDocTypeNameWithNamespace(nested) {
                                const pos = scanner2.getTokenPos();
                                if (!tokenIsIdentifierOrKeyword(token())) {
                                    return void 0;
                                }
                                const typeNameOrNamespaceName = parseJSDocIdentifierName();
                                if (parseOptional(24 /* DotToken */)) {
                                    const body = parseJSDocTypeNameWithNamespace(
                                    /*nested*/
                                    true);
                                    const jsDocNamespaceNode = factory2.createModuleDeclaration(
                                    /*modifiers*/
                                    void 0, typeNameOrNamespaceName, body, nested ? 4 /* NestedNamespace */ : void 0);
                                    return finishNode(jsDocNamespaceNode, pos);
                                }
                                if (nested) {
                                    typeNameOrNamespaceName.flags |= 2048 /* IdentifierIsInJSDocNamespace */;
                                }
                                return typeNameOrNamespaceName;
                            }
                            function parseCallbackTagParameters(indent2) {
                                const pos = getNodePos();
                                let child;
                                let parameters;
                                while (child = tryParse(() => parseChildParameterOrPropertyTag(4 /* CallbackParameter */, indent2))) {
                                    parameters = append(parameters, child);
                                }
                                return createNodeArray(parameters || [], pos);
                            }
                            function parseJSDocSignature(start2, indent2) {
                                const parameters = parseCallbackTagParameters(indent2);
                                const returnTag = tryParse(() => {
                                    if (parseOptionalJsdoc(59 /* AtToken */)) {
                                        const tag = parseTag(indent2);
                                        if (tag && tag.kind === 345 /* JSDocReturnTag */) {
                                            return tag;
                                        }
                                    }
                                });
                                return finishNode(factory2.createJSDocSignature(
                                /*typeParameters*/
                                void 0, parameters, returnTag), start2);
                            }
                            function parseCallbackTag(start2, tagName, indent2, indentText) {
                                const fullName = parseJSDocTypeNameWithNamespace();
                                skipWhitespace();
                                let comment = parseTagComments(indent2);
                                const typeExpression = parseJSDocSignature(start2, indent2);
                                if (!comment) {
                                    comment = parseTrailingTagComments(start2, getNodePos(), indent2, indentText);
                                }
                                const end2 = comment !== void 0 ? getNodePos() : typeExpression.end;
                                return finishNode(factory2.createJSDocCallbackTag(tagName, typeExpression, fullName, comment), start2, end2);
                            }
                            function parseOverloadTag(start2, tagName, indent2, indentText) {
                                skipWhitespace();
                                let comment = parseTagComments(indent2);
                                const typeExpression = parseJSDocSignature(start2, indent2);
                                if (!comment) {
                                    comment = parseTrailingTagComments(start2, getNodePos(), indent2, indentText);
                                }
                                const end2 = comment !== void 0 ? getNodePos() : typeExpression.end;
                                return finishNode(factory2.createJSDocOverloadTag(tagName, typeExpression, comment), start2, end2);
                            }
                            function escapedTextsEqual(a, b) {
                                while (!isIdentifier(a) || !isIdentifier(b)) {
                                    if (!isIdentifier(a) && !isIdentifier(b) && a.right.escapedText === b.right.escapedText) {
                                        a = a.left;
                                        b = b.left;
                                    }
                                    else {
                                        return false;
                                    }
                                }
                                return a.escapedText === b.escapedText;
                            }
                            function parseChildPropertyTag(indent2) {
                                return parseChildParameterOrPropertyTag(1 /* Property */, indent2);
                            }
                            function parseChildParameterOrPropertyTag(target, indent2, name) {
                                let canParseTag = true;
                                let seenAsterisk = false;
                                while (true) {
                                    switch (nextTokenJSDoc()) {
                                        case 59 /* AtToken */:
                                            if (canParseTag) {
                                                const child = tryParseChildTag(target, indent2);
                                                if (child && (child.kind === 344 /* JSDocParameterTag */ || child.kind === 351 /* JSDocPropertyTag */) && target !== 4 /* CallbackParameter */ && name && (isIdentifier(child.name) || !escapedTextsEqual(name, child.name.left))) {
                                                    return false;
                                                }
                                                return child;
                                            }
                                            seenAsterisk = false;
                                            break;
                                        case 4 /* NewLineTrivia */:
                                            canParseTag = true;
                                            seenAsterisk = false;
                                            break;
                                        case 41 /* AsteriskToken */:
                                            if (seenAsterisk) {
                                                canParseTag = false;
                                            }
                                            seenAsterisk = true;
                                            break;
                                        case 79 /* Identifier */:
                                            canParseTag = false;
                                            break;
                                        case 1 /* EndOfFileToken */:
                                            return false;
                                    }
                                }
                            }
                            function tryParseChildTag(target, indent2) {
                                Debug.assert(token() === 59 /* AtToken */);
                                const start2 = scanner2.getStartPos();
                                nextTokenJSDoc();
                                const tagName = parseJSDocIdentifierName();
                                skipWhitespace();
                                let t;
                                switch (tagName.escapedText) {
                                    case "type":
                                        return target === 1 /* Property */ && parseTypeTag(start2, tagName);
                                    case "prop":
                                    case "property":
                                        t = 1 /* Property */;
                                        break;
                                    case "arg":
                                    case "argument":
                                    case "param":
                                        t = 2 /* Parameter */ | 4 /* CallbackParameter */;
                                        break;
                                    default:
                                        return false;
                                }
                                if (!(target & t)) {
                                    return false;
                                }
                                return parseParameterOrPropertyTag(start2, tagName, target, indent2);
                            }
                            function parseTemplateTagTypeParameter() {
                                const typeParameterPos = getNodePos();
                                const isBracketed = parseOptionalJsdoc(22 /* OpenBracketToken */);
                                if (isBracketed) {
                                    skipWhitespace();
                                }
                                const name = parseJSDocIdentifierName(Diagnostics.Unexpected_token_A_type_parameter_name_was_expected_without_curly_braces);
                                let defaultType;
                                if (isBracketed) {
                                    skipWhitespace();
                                    parseExpected(63 /* EqualsToken */);
                                    defaultType = doInsideOfContext(8388608 /* JSDoc */, parseJSDocType);
                                    parseExpected(23 /* CloseBracketToken */);
                                }
                                if (nodeIsMissing(name)) {
                                    return void 0;
                                }
                                return finishNode(factory2.createTypeParameterDeclaration(
                                /*modifiers*/
                                void 0, name, 
                                /*constraint*/
                                void 0, defaultType), typeParameterPos);
                            }
                            function parseTemplateTagTypeParameters() {
                                const pos = getNodePos();
                                const typeParameters = [];
                                do {
                                    skipWhitespace();
                                    const node = parseTemplateTagTypeParameter();
                                    if (node !== void 0) {
                                        typeParameters.push(node);
                                    }
                                    skipWhitespaceOrAsterisk();
                                } while (parseOptionalJsdoc(27 /* CommaToken */));
                                return createNodeArray(typeParameters, pos);
                            }
                            function parseTemplateTag(start2, tagName, indent2, indentText) {
                                const constraint = token() === 18 /* OpenBraceToken */ ? parseJSDocTypeExpression() : void 0;
                                const typeParameters = parseTemplateTagTypeParameters();
                                return finishNode(factory2.createJSDocTemplateTag(tagName, constraint, typeParameters, parseTrailingTagComments(start2, getNodePos(), indent2, indentText)), start2);
                            }
                            function parseOptionalJsdoc(t) {
                                if (token() === t) {
                                    nextTokenJSDoc();
                                    return true;
                                }
                                return false;
                            }
                            function parseJSDocEntityName() {
                                let entity = parseJSDocIdentifierName();
                                if (parseOptional(22 /* OpenBracketToken */)) {
                                    parseExpected(23 /* CloseBracketToken */);
                                }
                                while (parseOptional(24 /* DotToken */)) {
                                    const name = parseJSDocIdentifierName();
                                    if (parseOptional(22 /* OpenBracketToken */)) {
                                        parseExpected(23 /* CloseBracketToken */);
                                    }
                                    entity = createQualifiedName(entity, name);
                                }
                                return entity;
                            }
                            function parseJSDocIdentifierName(message) {
                                if (!tokenIsIdentifierOrKeyword(token())) {
                                    return createMissingNode(79 /* Identifier */, 
                                    /*reportAtCurrentPosition*/
                                    !message, message || Diagnostics.Identifier_expected);
                                }
                                identifierCount++;
                                const pos = scanner2.getTokenPos();
                                const end2 = scanner2.getTextPos();
                                const originalKeywordKind = token();
                                const text = internIdentifier(scanner2.getTokenValue());
                                const result = finishNode(factoryCreateIdentifier(text, originalKeywordKind), pos, end2);
                                nextTokenJSDoc();
                                return result;
                            }
                        }