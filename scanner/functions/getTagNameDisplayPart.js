function getTagNameDisplayPart(kind) {
            switch (kind) {
                case 344 /* JSDocParameterTag */:
                    return parameterNamePart;
                case 351 /* JSDocPropertyTag */:
                    return propertyNamePart;
                case 348 /* JSDocTemplateTag */:
                    return typeParameterNamePart;
                case 349 /* JSDocTypedefTag */:
                case 341 /* JSDocCallbackTag */:
                    return typeAliasNamePart;
                default:
                    return textPart;
            }
        }