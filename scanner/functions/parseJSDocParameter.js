function parseJSDocParameter() {
                        const pos = getNodePos();
                        let name;
                        if (token() === 108 /* ThisKeyword */ || token() === 103 /* NewKeyword */) {
                            name = parseIdentifierName();
                            parseExpected(58 /* ColonToken */);
                        }
                        return finishNode(factory2.createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, 
                        // TODO(rbuckton): JSDoc parameters don't have names (except `this`/`new`), should we manufacture an empty identifier?
                        name, 
                        /*questionToken*/
                        void 0, parseJSDocType(), 
                        /*initializer*/
                        void 0), pos);
                    }