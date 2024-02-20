function getTypeFromJSDocVariadicType(node) {
                const type = getTypeFromTypeNode(node.type);
                const { parent: parent2 } = node;
                const paramTag = node.parent.parent;
                if (isJSDocTypeExpression(node.parent) && isJSDocParameterTag(paramTag)) {
                    const host2 = getHostSignatureFromJSDoc(paramTag);
                    const isCallbackTag = isJSDocCallbackTag(paramTag.parent.parent);
                    if (host2 || isCallbackTag) {
                        const lastParamDeclaration = isCallbackTag ? lastOrUndefined(paramTag.parent.parent.typeExpression.parameters) : lastOrUndefined(host2.parameters);
                        const symbol = getParameterSymbolFromJSDoc(paramTag);
                        if (!lastParamDeclaration || symbol && lastParamDeclaration.symbol === symbol && isRestParameter(lastParamDeclaration)) {
                            return createArrayType(type);
                        }
                    }
                }
                if (isParameter(parent2) && isJSDocFunctionType(parent2.parent)) {
                    return createArrayType(type);
                }
                return addOptionality(type);
            }