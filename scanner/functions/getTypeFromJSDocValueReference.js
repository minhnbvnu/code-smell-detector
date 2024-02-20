function getTypeFromJSDocValueReference(node, symbol) {
                const links = getNodeLinks(node);
                if (!links.resolvedJSDocType) {
                    const valueType = getTypeOfSymbol(symbol);
                    let typeType = valueType;
                    if (symbol.valueDeclaration) {
                        const isImportTypeWithQualifier = node.kind === 202 /* ImportType */ && node.qualifier;
                        if (valueType.symbol && valueType.symbol !== symbol && isImportTypeWithQualifier) {
                            typeType = getTypeReferenceType(node, valueType.symbol);
                        }
                    }
                    links.resolvedJSDocType = typeType;
                }
                return links.resolvedJSDocType;
            }