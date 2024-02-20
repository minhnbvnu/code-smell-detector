function getContextualTypeForJsxAttribute(attribute, contextFlags) {
                if (isJsxAttribute(attribute)) {
                    const attributesType = getApparentTypeOfContextualType(attribute.parent, contextFlags);
                    if (!attributesType || isTypeAny(attributesType)) {
                        return void 0;
                    }
                    return getTypeOfPropertyOfContextualType(attributesType, attribute.name.escapedText);
                }
                else {
                    return getContextualType2(attribute.parent, contextFlags);
                }
            }