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