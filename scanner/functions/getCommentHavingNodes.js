function getCommentHavingNodes(declaration) {
            switch (declaration.kind) {
                case 344 /* JSDocParameterTag */:
                case 351 /* JSDocPropertyTag */:
                    return [declaration];
                case 341 /* JSDocCallbackTag */:
                case 349 /* JSDocTypedefTag */:
                    return [declaration, declaration.parent];
                default:
                    return getJSDocCommentsAndTags(declaration);
            }
        }