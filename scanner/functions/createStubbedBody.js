function createStubbedBody(text, quotePreference) {
            return factory.createBlock([factory.createThrowStatement(factory.createNewExpression(factory.createIdentifier("Error"), 
                /*typeArguments*/
                void 0, 
                // TODO Handle auto quote preference.
                [factory.createStringLiteral(text, 
                    /*isSingleQuote*/
                    quotePreference === 0 /* Single */)]))], 
            /*multiline*/
            true);
        }