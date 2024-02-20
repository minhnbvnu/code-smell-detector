function getJsDocCommentsFromDeclarations(declarations, checker) {
            const parts = [];
            forEachUnique(declarations, (declaration) => {
                for (const jsdoc of getCommentHavingNodes(declaration)) {
                    const inheritDoc = isJSDoc(jsdoc) && jsdoc.tags && find(jsdoc.tags, (t) => t.kind === 330 /* JSDocTag */ && (t.tagName.escapedText === "inheritDoc" || t.tagName.escapedText === "inheritdoc"));
                    if (jsdoc.comment === void 0 && !inheritDoc || isJSDoc(jsdoc) && declaration.kind !== 349 /* JSDocTypedefTag */ && declaration.kind !== 341 /* JSDocCallbackTag */ && jsdoc.tags && jsdoc.tags.some((t) => t.kind === 349 /* JSDocTypedefTag */ || t.kind === 341 /* JSDocCallbackTag */) && !jsdoc.tags.some((t) => t.kind === 344 /* JSDocParameterTag */ || t.kind === 345 /* JSDocReturnTag */)) {
                        continue;
                    }
                    let newparts = jsdoc.comment ? getDisplayPartsFromComment(jsdoc.comment, checker) : [];
                    if (inheritDoc && inheritDoc.comment) {
                        newparts = newparts.concat(getDisplayPartsFromComment(inheritDoc.comment, checker));
                    }
                    if (!contains(parts, newparts, isIdenticalListOfDisplayParts)) {
                        parts.push(newparts);
                    }
                }
            });
            return flatten(intersperse(parts, [lineBreakPart()]));
        }