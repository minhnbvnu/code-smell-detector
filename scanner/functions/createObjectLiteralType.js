function createObjectLiteralType() {
                    const indexInfos = [];
                    if (hasComputedStringProperty)
                        indexInfos.push(getObjectLiteralIndexInfo(node, offset, propertiesArray, stringType));
                    if (hasComputedNumberProperty)
                        indexInfos.push(getObjectLiteralIndexInfo(node, offset, propertiesArray, numberType));
                    if (hasComputedSymbolProperty)
                        indexInfos.push(getObjectLiteralIndexInfo(node, offset, propertiesArray, esSymbolType));
                    const result = createAnonymousType(node.symbol, propertiesTable, emptyArray, emptyArray, indexInfos);
                    result.objectFlags |= objectFlags | 128 /* ObjectLiteral */ | 131072 /* ContainsObjectOrArrayLiteral */;
                    if (isJSObjectLiteral) {
                        result.objectFlags |= 4096 /* JSLiteral */;
                    }
                    if (patternWithComputedProperties) {
                        result.objectFlags |= 512 /* ObjectLiteralPatternWithComputedProperties */;
                    }
                    if (inDestructuringPattern) {
                        result.pattern = node;
                    }
                    return result;
                }