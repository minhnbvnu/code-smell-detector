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