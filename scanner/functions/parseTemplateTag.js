function parseTemplateTag(start2, tagName, indent2, indentText) {
                                const constraint = token() === 18 /* OpenBraceToken */ ? parseJSDocTypeExpression() : void 0;
                                const typeParameters = parseTemplateTagTypeParameters();
                                return finishNode(factory2.createJSDocTemplateTag(tagName, constraint, typeParameters, parseTrailingTagComments(start2, getNodePos(), indent2, indentText)), start2);
                            }