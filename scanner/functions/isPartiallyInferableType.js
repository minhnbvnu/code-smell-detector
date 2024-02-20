function isPartiallyInferableType(type) {
                return !(getObjectFlags(type) & 262144 /* NonInferrableType */) || isObjectLiteralType2(type) && some(getPropertiesOfType(type), (prop) => isPartiallyInferableType(getTypeOfSymbol(prop))) || isTupleType(type) && some(getTypeArguments(type), isPartiallyInferableType);
            }