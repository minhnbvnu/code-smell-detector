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