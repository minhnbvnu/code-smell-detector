function getJsDocTagsFromDeclarations(declarations, checker) {
            const infos = [];
            forEachUnique(declarations, (declaration) => {
                const tags = getJSDocTags(declaration);
                if (tags.some((t) => t.kind === 349 /* JSDocTypedefTag */ || t.kind === 341 /* JSDocCallbackTag */) && !tags.some((t) => t.kind === 344 /* JSDocParameterTag */ || t.kind === 345 /* JSDocReturnTag */)) {
                    return;
                }
                for (const tag of tags) {
                    infos.push({ name: tag.tagName.text, text: getCommentDisplayParts(tag, checker) });
                }
            });
            return infos;
        }