function checkTypeReferenceOrImport(node) {
                const type = getTypeFromTypeNode(node);
                if (!isErrorType(type)) {
                    if (node.typeArguments) {
                        addLazyDiagnostic(() => {
                            const typeParameters = getTypeParametersForTypeReferenceOrImport(node);
                            if (typeParameters) {
                                checkTypeArgumentConstraints(node, typeParameters);
                            }
                        });
                    }
                    const symbol = getNodeLinks(node).resolvedSymbol;
                    if (symbol) {
                        if (some(symbol.declarations, (d) => isTypeDeclaration(d) && !!(d.flags & 268435456 /* Deprecated */))) {
                            addDeprecatedSuggestion(getDeprecatedSuggestionNode(node), symbol.declarations, symbol.escapedName);
                        }
                    }
                }
            }