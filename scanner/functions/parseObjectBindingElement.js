function parseObjectBindingElement() {
                        const pos = getNodePos();
                        const dotDotDotToken = parseOptionalToken(25 /* DotDotDotToken */);
                        const tokenIsIdentifier = isBindingIdentifier();
                        let propertyName = parsePropertyName();
                        let name;
                        if (tokenIsIdentifier && token() !== 58 /* ColonToken */) {
                            name = propertyName;
                            propertyName = void 0;
                        }
                        else {
                            parseExpected(58 /* ColonToken */);
                            name = parseIdentifierOrPattern();
                        }
                        const initializer = parseInitializer();
                        return finishNode(factory2.createBindingElement(dotDotDotToken, propertyName, name, initializer), pos);
                    }