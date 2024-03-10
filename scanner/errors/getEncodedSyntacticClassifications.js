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