function parseMappedTypeParameter() {
                        const pos = getNodePos();
                        const name = parseIdentifierName();
                        parseExpected(101 /* InKeyword */);
                        const type = parseType();
                        return finishNode(factory2.createTypeParameterDeclaration(
                        /*modifiers*/
                        void 0, name, type, 
                        /*defaultType*/
                        void 0), pos);
                    }