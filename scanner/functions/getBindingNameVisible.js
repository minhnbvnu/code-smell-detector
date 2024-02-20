function getBindingNameVisible(elem) {
                if (isOmittedExpression(elem)) {
                    return false;
                }
                if (isBindingPattern(elem.name)) {
                    return some(elem.name.elements, getBindingNameVisible);
                }
                else {
                    return resolver.isDeclarationVisible(elem);
                }
            }