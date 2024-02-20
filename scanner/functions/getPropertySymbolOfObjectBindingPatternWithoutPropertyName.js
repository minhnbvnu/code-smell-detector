function getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol2, checker2) {
                            const bindingElement = getDeclarationOfKind(symbol2, 205 /* BindingElement */);
                            if (bindingElement && isObjectBindingElementWithoutPropertyName(bindingElement)) {
                                return getPropertySymbolFromBindingElement(checker2, bindingElement);
                            }
                        }