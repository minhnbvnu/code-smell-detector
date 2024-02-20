function getPropertyOfVariable(symbol, name) {
                if (symbol.flags & 3 /* Variable */) {
                    const typeAnnotation = symbol.valueDeclaration.type;
                    if (typeAnnotation) {
                        return resolveSymbol(getPropertyOfType(getTypeFromTypeNode(typeAnnotation), name));
                    }
                }
            }