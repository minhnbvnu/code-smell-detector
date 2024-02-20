function getUnresolvedSymbolForEntityName(name) {
                const identifier = name.kind === 163 /* QualifiedName */ ? name.right : name.kind === 208 /* PropertyAccessExpression */ ? name.name : name;
                const text = identifier.escapedText;
                if (text) {
                    const parentSymbol = name.kind === 163 /* QualifiedName */ ? getUnresolvedSymbolForEntityName(name.left) : name.kind === 208 /* PropertyAccessExpression */ ? getUnresolvedSymbolForEntityName(name.expression) : void 0;
                    const path = parentSymbol ? `${getSymbolPath(parentSymbol)}.${text}` : text;
                    let result = unresolvedSymbols.get(path);
                    if (!result) {
                        unresolvedSymbols.set(path, result = createSymbol(524288 /* TypeAlias */, text, 1048576 /* Unresolved */));
                        result.parent = parentSymbol;
                        result.links.declaredType = unresolvedType;
                    }
                    return result;
                }
                return unknownSymbol;
            }