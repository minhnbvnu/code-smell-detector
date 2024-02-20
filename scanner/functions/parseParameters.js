function parseParameters(flags) {
                        if (!parseExpected(20 /* OpenParenToken */)) {
                            return createMissingList();
                        }
                        const parameters = parseParametersWorker(flags, 
                        /*allowAmbiguity*/
                        true);
                        parseExpected(21 /* CloseParenToken */);
                        return parameters;
                    }