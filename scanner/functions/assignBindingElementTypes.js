function assignBindingElementTypes(pattern, parentType) {
                for (const element of pattern.elements) {
                    if (!isOmittedExpression(element)) {
                        const type = getBindingElementTypeFromParentType(element, parentType);
                        if (element.name.kind === 79 /* Identifier */) {
                            getSymbolLinks(getSymbolOfDeclaration(element)).type = type;
                        }
                        else {
                            assignBindingElementTypes(element.name, type);
                        }
                    }
                }
            }