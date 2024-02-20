function filterBindingPatternInitializersAndRenamings(name) {
                if (name.kind === 79 /* Identifier */) {
                    return name;
                }
                else {
                    if (name.kind === 204 /* ArrayBindingPattern */) {
                        return factory2.updateArrayBindingPattern(name, visitNodes2(name.elements, visitBindingElement, isArrayBindingElement));
                    }
                    else {
                        return factory2.updateObjectBindingPattern(name, visitNodes2(name.elements, visitBindingElement, isBindingElement));
                    }
                }
                function visitBindingElement(elem) {
                    if (elem.kind === 229 /* OmittedExpression */) {
                        return elem;
                    }
                    if (elem.propertyName && isIdentifier(elem.propertyName) && isIdentifier(elem.name) && !elem.symbol.isReferenced && !isIdentifierANonContextualKeyword(elem.propertyName)) {
                        return factory2.updateBindingElement(elem, elem.dotDotDotToken, 
                        /* propertyName */
                        void 0, elem.propertyName, shouldPrintWithInitializer(elem) ? elem.initializer : void 0);
                    }
                    return factory2.updateBindingElement(elem, elem.dotDotDotToken, elem.propertyName, filterBindingPatternInitializersAndRenamings(elem.name), shouldPrintWithInitializer(elem) ? elem.initializer : void 0);
                }
            }