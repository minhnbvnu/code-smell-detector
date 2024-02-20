function getImplementsTypes(type) {
                let resolvedImplementsTypes = emptyArray;
                if (type.symbol.declarations) {
                    for (const declaration of type.symbol.declarations) {
                        const implementsTypeNodes = getEffectiveImplementsTypeNodes(declaration);
                        if (!implementsTypeNodes)
                            continue;
                        for (const node of implementsTypeNodes) {
                            const implementsType = getTypeFromTypeNode(node);
                            if (!isErrorType(implementsType)) {
                                if (resolvedImplementsTypes === emptyArray) {
                                    resolvedImplementsTypes = [implementsType];
                                }
                                else {
                                    resolvedImplementsTypes.push(implementsType);
                                }
                            }
                        }
                    }
                }
                return resolvedImplementsTypes;
            }