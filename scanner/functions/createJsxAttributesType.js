function createJsxAttributesType() {
                    objectFlags |= freshObjectLiteralFlag;
                    const result = createAnonymousType(attributes.symbol, attributesTable, emptyArray, emptyArray, emptyArray);
                    result.objectFlags |= objectFlags | 128 /* ObjectLiteral */ | 131072 /* ContainsObjectOrArrayLiteral */;
                    return result;
                }