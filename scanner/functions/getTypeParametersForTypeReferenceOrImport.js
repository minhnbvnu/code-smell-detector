function getTypeParametersForTypeReferenceOrImport(node) {
                const type = getTypeFromTypeNode(node);
                if (!isErrorType(type)) {
                    const symbol = getNodeLinks(node).resolvedSymbol;
                    if (symbol) {
                        return getTypeParametersForTypeAndSymbol(type, symbol);
                    }
                }
                return void 0;
            }