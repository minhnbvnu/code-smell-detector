function getCommentDisplayParts(tag, checker) {
            const { comment, kind } = tag;
            const namePart = getTagNameDisplayPart(kind);
            switch (kind) {
                case 352 /* JSDocThrowsTag */:
                    const typeExpression = tag.typeExpression;
                    return typeExpression ? withNode(typeExpression) : comment === void 0 ? void 0 : getDisplayPartsFromComment(comment, checker);
                case 332 /* JSDocImplementsTag */:
                    return withNode(tag.class);
                case 331 /* JSDocAugmentsTag */:
                    return withNode(tag.class);
                case 348 /* JSDocTemplateTag */:
                    const templateTag = tag;
                    const displayParts = [];
                    if (templateTag.constraint) {
                        displayParts.push(textPart(templateTag.constraint.getText()));
                    }
                    if (length(templateTag.typeParameters)) {
                        if (length(displayParts)) {
                            displayParts.push(spacePart());
                        }
                        const lastTypeParameter = templateTag.typeParameters[templateTag.typeParameters.length - 1];
                        forEach(templateTag.typeParameters, (tp) => {
                            displayParts.push(namePart(tp.getText()));
                            if (lastTypeParameter !== tp) {
                                displayParts.push(...[punctuationPart(27 /* CommaToken */), spacePart()]);
                            }
                        });
                    }
                    if (comment) {
                        displayParts.push(...[spacePart(), ...getDisplayPartsFromComment(comment, checker)]);
                    }
                    return displayParts;
                case 347 /* JSDocTypeTag */:
                case 353 /* JSDocSatisfiesTag */:
                    return withNode(tag.typeExpression);
                case 349 /* JSDocTypedefTag */:
                case 341 /* JSDocCallbackTag */:
                case 351 /* JSDocPropertyTag */:
                case 344 /* JSDocParameterTag */:
                case 350 /* JSDocSeeTag */:
                    const { name } = tag;
                    return name ? withNode(name) : comment === void 0 ? void 0 : getDisplayPartsFromComment(comment, checker);
                default:
                    return comment === void 0 ? void 0 : getDisplayPartsFromComment(comment, checker);
            }
            function withNode(node) {
                return addComment(node.getText());
            }
            function addComment(s) {
                if (comment) {
                    if (s.match(/^https?$/)) {
                        return [textPart(s), ...getDisplayPartsFromComment(comment, checker)];
                    }
                    else {
                        return [namePart(s), spacePart(), ...getDisplayPartsFromComment(comment, checker)];
                    }
                }
                else {
                    return [textPart(s)];
                }
            }
        }