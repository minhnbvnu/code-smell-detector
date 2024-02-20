function isTagWithTypeExpression(tag) {
                switch (tag.kind) {
                    case 344 /* JSDocParameterTag */:
                    case 351 /* JSDocPropertyTag */:
                    case 345 /* JSDocReturnTag */:
                    case 347 /* JSDocTypeTag */:
                    case 349 /* JSDocTypedefTag */:
                    case 352 /* JSDocThrowsTag */:
                    case 353 /* JSDocSatisfiesTag */:
                        return true;
                    case 348 /* JSDocTemplateTag */:
                        return !!tag.constraint;
                    default:
                        return false;
                }
            }