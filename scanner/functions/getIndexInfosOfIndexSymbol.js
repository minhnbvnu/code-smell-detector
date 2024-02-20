function getIndexInfosOfIndexSymbol(indexSymbol) {
                if (indexSymbol.declarations) {
                    const indexInfos = [];
                    for (const declaration of indexSymbol.declarations) {
                        if (declaration.parameters.length === 1) {
                            const parameter = declaration.parameters[0];
                            if (parameter.type) {
                                forEachType(getTypeFromTypeNode(parameter.type), (keyType) => {
                                    if (isValidIndexKeyType(keyType) && !findIndexInfo(indexInfos, keyType)) {
                                        indexInfos.push(createIndexInfo(keyType, declaration.type ? getTypeFromTypeNode(declaration.type) : anyType, hasEffectiveModifier(declaration, 64 /* Readonly */), declaration));
                                    }
                                });
                            }
                        }
                    }
                    return indexInfos;
                }
                return emptyArray;
            }