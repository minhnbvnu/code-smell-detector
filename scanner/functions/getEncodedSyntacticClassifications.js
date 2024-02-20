function getEncodedSyntacticClassifications(cancellationToken, sourceFile, span) {
            const spanStart = span.start;
            const spanLength = span.length;
            const triviaScanner = createScanner(99 /* Latest */, 
            /*skipTrivia*/
            false, sourceFile.languageVariant, sourceFile.text);
            const mergeConflictScanner = createScanner(99 /* Latest */, 
            /*skipTrivia*/
            false, sourceFile.languageVariant, sourceFile.text);
            const result = [];
            processElement(sourceFile);
            return { spans: result, endOfLineState: 0 /* None */ };
            function pushClassification(start, length2, type) {
                result.push(start);
                result.push(length2);
                result.push(type);
            }
            function classifyLeadingTriviaAndGetTokenStart(token) {
                triviaScanner.setTextPos(token.pos);
                while (true) {
                    const start = triviaScanner.getTextPos();
                    if (!couldStartTrivia(sourceFile.text, start)) {
                        return start;
                    }
                    const kind = triviaScanner.scan();
                    const end = triviaScanner.getTextPos();
                    const width = end - start;
                    if (!isTrivia(kind)) {
                        return start;
                    }
                    switch (kind) {
                        case 4 /* NewLineTrivia */:
                        case 5 /* WhitespaceTrivia */:
                            continue;
                        case 2 /* SingleLineCommentTrivia */:
                        case 3 /* MultiLineCommentTrivia */:
                            classifyComment(token, kind, start, width);
                            triviaScanner.setTextPos(end);
                            continue;
                        case 7 /* ConflictMarkerTrivia */:
                            const text = sourceFile.text;
                            const ch = text.charCodeAt(start);
                            if (ch === 60 /* lessThan */ || ch === 62 /* greaterThan */) {
                                pushClassification(start, width, 1 /* comment */);
                                continue;
                            }
                            Debug.assert(ch === 124 /* bar */ || ch === 61 /* equals */);
                            classifyDisabledMergeCode(text, start, end);
                            break;
                        case 6 /* ShebangTrivia */:
                            break;
                        default:
                            Debug.assertNever(kind);
                    }
                }
            }
            function classifyComment(token, kind, start, width) {
                if (kind === 3 /* MultiLineCommentTrivia */) {
                    const docCommentAndDiagnostics = parseIsolatedJSDocComment(sourceFile.text, start, width);
                    if (docCommentAndDiagnostics && docCommentAndDiagnostics.jsDoc) {
                        setParent(docCommentAndDiagnostics.jsDoc, token);
                        classifyJSDocComment(docCommentAndDiagnostics.jsDoc);
                        return;
                    }
                }
                else if (kind === 2 /* SingleLineCommentTrivia */) {
                    if (tryClassifyTripleSlashComment(start, width)) {
                        return;
                    }
                }
                pushCommentRange(start, width);
            }
            function pushCommentRange(start, width) {
                pushClassification(start, width, 1 /* comment */);
            }
            function classifyJSDocComment(docComment) {
                var _a2, _b, _c, _d, _e, _f, _g, _h;
                let pos = docComment.pos;
                if (docComment.tags) {
                    for (const tag of docComment.tags) {
                        if (tag.pos !== pos) {
                            pushCommentRange(pos, tag.pos - pos);
                        }
                        pushClassification(tag.pos, 1, 10 /* punctuation */);
                        pushClassification(tag.tagName.pos, tag.tagName.end - tag.tagName.pos, 18 /* docCommentTagName */);
                        pos = tag.tagName.end;
                        let commentStart = tag.tagName.end;
                        switch (tag.kind) {
                            case 344 /* JSDocParameterTag */:
                                const param = tag;
                                processJSDocParameterTag(param);
                                commentStart = param.isNameFirst && ((_a2 = param.typeExpression) == null ? void 0 : _a2.end) || param.name.end;
                                break;
                            case 351 /* JSDocPropertyTag */:
                                const prop = tag;
                                commentStart = prop.isNameFirst && ((_b = prop.typeExpression) == null ? void 0 : _b.end) || prop.name.end;
                                break;
                            case 348 /* JSDocTemplateTag */:
                                processJSDocTemplateTag(tag);
                                pos = tag.end;
                                commentStart = tag.typeParameters.end;
                                break;
                            case 349 /* JSDocTypedefTag */:
                                const type = tag;
                                commentStart = ((_c = type.typeExpression) == null ? void 0 : _c.kind) === 312 /* JSDocTypeExpression */ && ((_d = type.fullName) == null ? void 0 : _d.end) || ((_e = type.typeExpression) == null ? void 0 : _e.end) || commentStart;
                                break;
                            case 341 /* JSDocCallbackTag */:
                                commentStart = tag.typeExpression.end;
                                break;
                            case 347 /* JSDocTypeTag */:
                                processElement(tag.typeExpression);
                                pos = tag.end;
                                commentStart = tag.typeExpression.end;
                                break;
                            case 346 /* JSDocThisTag */:
                            case 343 /* JSDocEnumTag */:
                                commentStart = tag.typeExpression.end;
                                break;
                            case 345 /* JSDocReturnTag */:
                                processElement(tag.typeExpression);
                                pos = tag.end;
                                commentStart = ((_f = tag.typeExpression) == null ? void 0 : _f.end) || commentStart;
                                break;
                            case 350 /* JSDocSeeTag */:
                                commentStart = ((_g = tag.name) == null ? void 0 : _g.end) || commentStart;
                                break;
                            case 331 /* JSDocAugmentsTag */:
                            case 332 /* JSDocImplementsTag */:
                                commentStart = tag.class.end;
                                break;
                            case 352 /* JSDocThrowsTag */:
                                processElement(tag.typeExpression);
                                pos = tag.end;
                                commentStart = ((_h = tag.typeExpression) == null ? void 0 : _h.end) || commentStart;
                                break;
                        }
                        if (typeof tag.comment === "object") {
                            pushCommentRange(tag.comment.pos, tag.comment.end - tag.comment.pos);
                        }
                        else if (typeof tag.comment === "string") {
                            pushCommentRange(commentStart, tag.end - commentStart);
                        }
                    }
                }
                if (pos !== docComment.end) {
                    pushCommentRange(pos, docComment.end - pos);
                }
                return;
                function processJSDocParameterTag(tag) {
                    if (tag.isNameFirst) {
                        pushCommentRange(pos, tag.name.pos - pos);
                        pushClassification(tag.name.pos, tag.name.end - tag.name.pos, 17 /* parameterName */);
                        pos = tag.name.end;
                    }
                    if (tag.typeExpression) {
                        pushCommentRange(pos, tag.typeExpression.pos - pos);
                        processElement(tag.typeExpression);
                        pos = tag.typeExpression.end;
                    }
                    if (!tag.isNameFirst) {
                        pushCommentRange(pos, tag.name.pos - pos);
                        pushClassification(tag.name.pos, tag.name.end - tag.name.pos, 17 /* parameterName */);
                        pos = tag.name.end;
                    }
                }
            }
            function tryClassifyTripleSlashComment(start, width) {
                const tripleSlashXMLCommentRegEx = /^(\/\/\/\s*)(<)(?:(\S+)((?:[^/]|\/[^>])*)(\/>)?)?/im;
                const attributeRegex = /(\s)(\S+)(\s*)(=)(\s*)('[^']+'|"[^"]+")/img;
                const text = sourceFile.text.substr(start, width);
                const match = tripleSlashXMLCommentRegEx.exec(text);
                if (!match) {
                    return false;
                }
                if (!match[3] || !(match[3] in commentPragmas)) {
                    return false;
                }
                let pos = start;
                pushCommentRange(pos, match[1].length);
                pos += match[1].length;
                pushClassification(pos, match[2].length, 10 /* punctuation */);
                pos += match[2].length;
                pushClassification(pos, match[3].length, 21 /* jsxSelfClosingTagName */);
                pos += match[3].length;
                const attrText = match[4];
                let attrPos = pos;
                while (true) {
                    const attrMatch = attributeRegex.exec(attrText);
                    if (!attrMatch) {
                        break;
                    }
                    const newAttrPos = pos + attrMatch.index + attrMatch[1].length;
                    if (newAttrPos > attrPos) {
                        pushCommentRange(attrPos, newAttrPos - attrPos);
                        attrPos = newAttrPos;
                    }
                    pushClassification(attrPos, attrMatch[2].length, 22 /* jsxAttribute */);
                    attrPos += attrMatch[2].length;
                    if (attrMatch[3].length) {
                        pushCommentRange(attrPos, attrMatch[3].length);
                        attrPos += attrMatch[3].length;
                    }
                    pushClassification(attrPos, attrMatch[4].length, 5 /* operator */);
                    attrPos += attrMatch[4].length;
                    if (attrMatch[5].length) {
                        pushCommentRange(attrPos, attrMatch[5].length);
                        attrPos += attrMatch[5].length;
                    }
                    pushClassification(attrPos, attrMatch[6].length, 24 /* jsxAttributeStringLiteralValue */);
                    attrPos += attrMatch[6].length;
                }
                pos += match[4].length;
                if (pos > attrPos) {
                    pushCommentRange(attrPos, pos - attrPos);
                }
                if (match[5]) {
                    pushClassification(pos, match[5].length, 10 /* punctuation */);
                    pos += match[5].length;
                }
                const end = start + width;
                if (pos < end) {
                    pushCommentRange(pos, end - pos);
                }
                return true;
            }
            function processJSDocTemplateTag(tag) {
                for (const child of tag.getChildren()) {
                    processElement(child);
                }
            }
            function classifyDisabledMergeCode(text, start, end) {
                let i;
                for (i = start; i < end; i++) {
                    if (isLineBreak(text.charCodeAt(i))) {
                        break;
                    }
                }
                pushClassification(start, i - start, 1 /* comment */);
                mergeConflictScanner.setTextPos(i);
                while (mergeConflictScanner.getTextPos() < end) {
                    classifyDisabledCodeToken();
                }
            }
            function classifyDisabledCodeToken() {
                const start = mergeConflictScanner.getTextPos();
                const tokenKind = mergeConflictScanner.scan();
                const end = mergeConflictScanner.getTextPos();
                const type = classifyTokenType(tokenKind);
                if (type) {
                    pushClassification(start, end - start, type);
                }
            }
            function tryClassifyNode(node) {
                if (isJSDoc(node)) {
                    return true;
                }
                if (nodeIsMissing(node)) {
                    return true;
                }
                const classifiedElementName = tryClassifyJsxElementName(node);
                if (!isToken(node) && node.kind !== 11 /* JsxText */ && classifiedElementName === void 0) {
                    return false;
                }
                const tokenStart = node.kind === 11 /* JsxText */ ? node.pos : classifyLeadingTriviaAndGetTokenStart(node);
                const tokenWidth = node.end - tokenStart;
                Debug.assert(tokenWidth >= 0);
                if (tokenWidth > 0) {
                    const type = classifiedElementName || classifyTokenType(node.kind, node);
                    if (type) {
                        pushClassification(tokenStart, tokenWidth, type);
                    }
                }
                return true;
            }
            function tryClassifyJsxElementName(token) {
                switch (token.parent && token.parent.kind) {
                    case 283 /* JsxOpeningElement */:
                        if (token.parent.tagName === token) {
                            return 19 /* jsxOpenTagName */;
                        }
                        break;
                    case 284 /* JsxClosingElement */:
                        if (token.parent.tagName === token) {
                            return 20 /* jsxCloseTagName */;
                        }
                        break;
                    case 282 /* JsxSelfClosingElement */:
                        if (token.parent.tagName === token) {
                            return 21 /* jsxSelfClosingTagName */;
                        }
                        break;
                    case 288 /* JsxAttribute */:
                        if (token.parent.name === token) {
                            return 22 /* jsxAttribute */;
                        }
                        break;
                }
                return void 0;
            }
            function classifyTokenType(tokenKind, token) {
                if (isKeyword(tokenKind)) {
                    return 3 /* keyword */;
                }
                if (tokenKind === 29 /* LessThanToken */ || tokenKind === 31 /* GreaterThanToken */) {
                    if (token && getTypeArgumentOrTypeParameterList(token.parent)) {
                        return 10 /* punctuation */;
                    }
                }
                if (isPunctuation(tokenKind)) {
                    if (token) {
                        const parent2 = token.parent;
                        if (tokenKind === 63 /* EqualsToken */) {
                            if (parent2.kind === 257 /* VariableDeclaration */ || parent2.kind === 169 /* PropertyDeclaration */ || parent2.kind === 166 /* Parameter */ || parent2.kind === 288 /* JsxAttribute */) {
                                return 5 /* operator */;
                            }
                        }
                        if (parent2.kind === 223 /* BinaryExpression */ || parent2.kind === 221 /* PrefixUnaryExpression */ || parent2.kind === 222 /* PostfixUnaryExpression */ || parent2.kind === 224 /* ConditionalExpression */) {
                            return 5 /* operator */;
                        }
                    }
                    return 10 /* punctuation */;
                }
                else if (tokenKind === 8 /* NumericLiteral */) {
                    return 4 /* numericLiteral */;
                }
                else if (tokenKind === 9 /* BigIntLiteral */) {
                    return 25 /* bigintLiteral */;
                }
                else if (tokenKind === 10 /* StringLiteral */) {
                    return token && token.parent.kind === 288 /* JsxAttribute */ ? 24 /* jsxAttributeStringLiteralValue */ : 6 /* stringLiteral */;
                }
                else if (tokenKind === 13 /* RegularExpressionLiteral */) {
                    return 6 /* stringLiteral */;
                }
                else if (isTemplateLiteralKind(tokenKind)) {
                    return 6 /* stringLiteral */;
                }
                else if (tokenKind === 11 /* JsxText */) {
                    return 23 /* jsxText */;
                }
                else if (tokenKind === 79 /* Identifier */) {
                    if (token) {
                        switch (token.parent.kind) {
                            case 260 /* ClassDeclaration */:
                                if (token.parent.name === token) {
                                    return 11 /* className */;
                                }
                                return;
                            case 165 /* TypeParameter */:
                                if (token.parent.name === token) {
                                    return 15 /* typeParameterName */;
                                }
                                return;
                            case 261 /* InterfaceDeclaration */:
                                if (token.parent.name === token) {
                                    return 13 /* interfaceName */;
                                }
                                return;
                            case 263 /* EnumDeclaration */:
                                if (token.parent.name === token) {
                                    return 12 /* enumName */;
                                }
                                return;
                            case 264 /* ModuleDeclaration */:
                                if (token.parent.name === token) {
                                    return 14 /* moduleName */;
                                }
                                return;
                            case 166 /* Parameter */:
                                if (token.parent.name === token) {
                                    return isThisIdentifier(token) ? 3 /* keyword */ : 17 /* parameterName */;
                                }
                                return;
                        }
                        if (isConstTypeReference(token.parent)) {
                            return 3 /* keyword */;
                        }
                    }
                    return 2 /* identifier */;
                }
            }
            function processElement(element) {
                if (!element) {
                    return;
                }
                if (decodedTextSpanIntersectsWith(spanStart, spanLength, element.pos, element.getFullWidth())) {
                    checkForClassificationCancellation(cancellationToken, element.kind);
                    for (const child of element.getChildren(sourceFile)) {
                        if (!tryClassifyNode(child)) {
                            processElement(child);
                        }
                    }
                }
            }
        }