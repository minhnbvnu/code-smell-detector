function parseArrayBindingElement() {
                        const pos = getNodePos();
                        if (token() === 27 /* CommaToken */) {
                            return finishNode(factory2.createOmittedExpression(), pos);
                        }
                        const dotDotDotToken = parseOptionalToken(25 /* DotDotDotToken */);
                        const name = parseIdentifierOrPattern();
                        const initializer = parseInitializer();
                        return finishNode(factory2.createBindingElement(dotDotDotToken, 
                        /*propertyName*/
                        void 0, name, initializer), pos);
                    }