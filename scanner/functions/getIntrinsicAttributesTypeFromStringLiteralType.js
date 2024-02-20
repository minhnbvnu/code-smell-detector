function getIntrinsicAttributesTypeFromStringLiteralType(type, location) {
                const intrinsicElementsType = getJsxType(JsxNames.IntrinsicElements, location);
                if (!isErrorType(intrinsicElementsType)) {
                    const stringLiteralTypeName = type.value;
                    const intrinsicProp = getPropertyOfType(intrinsicElementsType, escapeLeadingUnderscores(stringLiteralTypeName));
                    if (intrinsicProp) {
                        return getTypeOfSymbol(intrinsicProp);
                    }
                    const indexSignatureType = getIndexTypeOfType(intrinsicElementsType, stringType);
                    if (indexSignatureType) {
                        return indexSignatureType;
                    }
                    return void 0;
                }
                return anyType;
            }