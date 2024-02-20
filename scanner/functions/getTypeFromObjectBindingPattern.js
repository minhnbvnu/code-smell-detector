function getTypeFromObjectBindingPattern(pattern, includePatternInType, reportErrors2) {
                const members = createSymbolTable();
                let stringIndexInfo;
                let objectFlags = 128 /* ObjectLiteral */ | 131072 /* ContainsObjectOrArrayLiteral */;
                forEach(pattern.elements, (e) => {
                    const name = e.propertyName || e.name;
                    if (e.dotDotDotToken) {
                        stringIndexInfo = createIndexInfo(stringType, anyType, 
                        /*isReadonly*/
                        false);
                        return;
                    }
                    const exprType = getLiteralTypeFromPropertyName(name);
                    if (!isTypeUsableAsPropertyName(exprType)) {
                        objectFlags |= 512 /* ObjectLiteralPatternWithComputedProperties */;
                        return;
                    }
                    const text = getPropertyNameFromType(exprType);
                    const flags = 4 /* Property */ | (e.initializer ? 16777216 /* Optional */ : 0);
                    const symbol = createSymbol(flags, text);
                    symbol.links.type = getTypeFromBindingElement(e, includePatternInType, reportErrors2);
                    symbol.links.bindingElement = e;
                    members.set(symbol.escapedName, symbol);
                });
                const result = createAnonymousType(void 0, members, emptyArray, emptyArray, stringIndexInfo ? [stringIndexInfo] : emptyArray);
                result.objectFlags |= objectFlags;
                if (includePatternInType) {
                    result.pattern = pattern;
                    result.objectFlags |= 131072 /* ContainsObjectOrArrayLiteral */;
                }
                return result;
            }